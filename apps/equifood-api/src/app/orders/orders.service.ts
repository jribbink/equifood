import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Item } from '../merchant/items/entities/item.entity';
import { Merchant } from '../merchant/entities/merchant.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Order } from './entities/order.entity';
import { OrderedItem } from './entities/ordered-item.entity';
import { OrderedItemDTO } from './models/ordered-item.dto';
import { ORDER_STATUS } from '@equifood/api-interfaces';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(OrderedItem)
    private orderedItemRepository: Repository<OrderedItem>,
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
    private usersService: UsersService
  ) {}

  async getMerchantOrders(merchant: FindOptionsWhere<Merchant>) {
    return this.ordersRepository.find({
      where: {
        merchant,
      },
    });
  }

  async getOrders(userIdOrUser: string | User) {
    let user: User;
    if (!(userIdOrUser instanceof User))
      user = await this.usersService.findOne({
        id: userIdOrUser,
      });
    else user = userIdOrUser;

    if (user.roles.includes('merchant')) {
      return this.ordersRepository.find({
        where: {
          merchant: {
            user: {
              id: user.id,
            },
          },
        },
      });
    }
    return this.ordersRepository.find({
      where: {
        user: { id: user.id },
      },
    });
  }

  async getOrder(user: User, id: number) {
    const order = await this.ordersRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        merchant: {
          user: true,
        },
      },
    });
    if (!order) throw new NotFoundException('Order does not exist');
    if (user.roles.includes('customer') && order.user.id !== user.id)
      throw new UnauthorizedException();
    if (user.roles.includes('merchant') && order.merchant.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    return order;
  }

  async placeOrder(
    user: User,
    merchantId: string,
    itemDtoList: OrderedItemDTO[]
  ) {
    const merchant = await this.merchantRepository.findOneBy({
      id: merchantId,
    });
    if (!merchant)
      throw new BadRequestException(`Merchant ${merchantId} does not exist`);

    // generate item quantity map & validate ordered items
    const quantityMap = new Map<string, [quantity: number, itemRef: Item]>();
    await Promise.all(
      itemDtoList.map((itemDto) =>
        this.validateOrderItem(itemDto, merchantId, quantityMap)
      )
    );

    // update item quantities & create OrderedItem entities
    // also calculate total price

    let totalPrice = 0;
    const orderedItems = [];
    await Promise.all([
      ...[...quantityMap.entries()].map(async ([id, [quantity, itemRef]]) => {
        this.itemRepository.save({
          id,
          quantity: itemRef.quantity - quantity,
        });
      }),
      ...[...quantityMap.values()].map(async ([quantity, itemRef]) => {
        orderedItems.push(
          await this.orderedItemRepository.save(<OrderedItem>{
            item: itemRef,
            quantity: quantity,
          })
        );
      }),
      ...[...quantityMap.values()].map(([quantity, itemRef]) => {
        totalPrice += quantity * itemRef.price;
      }),
    ]);

    // save order
    return await this.ordersRepository.save({
      order_date: new Date(),
      deadline: new Date(),
      items: [...orderedItems],
      merchant: merchant,
      status: ORDER_STATUS.pending,
      total: totalPrice,
      user: user,
    });
  }

  async validateOrderItem(
    itemDto: OrderedItemDTO,
    merchantId: string,
    quantityMap: Map<string, [quantity: number, itemRef: Item]>
  ) {
    const item = await this.itemRepository.findOne({
      where: { id: itemDto.id },
      relations: { merchant: true },
    });
    if (!item) {
      throw new BadRequestException(`Item ${itemDto.id} does not exist`);
    }

    if (item.merchant.id !== merchantId) {
      throw new BadRequestException(
        `Item ${item.id} does not belong to merchant ${merchantId}`
      );
    }

    if (quantityMap.has(item.id)) {
      throw new BadRequestException('Duplicate item id exists');
    }

    if (item.quantity < itemDto.quantity) {
      throw new BadRequestException(`Insufficient quantity of item ${item.id}`);
    }

    if (item.quantity < 0) {
      throw new BadRequestException(
        `Cannot order negative quantity of item ${item.id}`
      );
    }

    // Add item if quantity > 0
    if (itemDto.quantity > 0)
      quantityMap.set(item.id, [itemDto.quantity, item]);
  }

  async setOrderStatus(user: User, orderId: number, status: ORDER_STATUS) {
    const order = await this.getOrder(user, orderId);

    // Pending promises to await before returning
    const pendingPromises: Promise<any>[] = [];

    // Don't change if status is already the same
    if (status === order.status) return;

    // Disallow changing status from completed
    if (order.status === ORDER_STATUS.completed) {
      throw new BadRequestException('Cannot modify status of completed order');
    }

    if (status !== ORDER_STATUS.cancelled) {
      // Only merchant/admin can perform non-cancellation status updates
      if (!user.roles.includes('merchant') && !user.roles.includes('admin')) {
        throw new UnauthorizedException(
          'Only merchants may perform this operation'
        );
      }

      // Ensure that status is only moving in correct direction
      if (order.status > status) {
        throw new BadRequestException('Cannot modify status in reverse');
      }
    } else {
      // Restore items to merchant inventory
      pendingPromises.push(
        ...order.items.map(async (orderedItem) => {
          await this.itemRepository.save({
            id: orderedItem.item.id,
            quantity: orderedItem.item.quantity + orderedItem.quantity,
          });
        })
      );
    }

    // Finally, update status
    pendingPromises.push(this.ordersRepository.save({ id: order.id, status }));

    await Promise.all(pendingPromises);
  }
}
