import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../merchant/entities/item.entity';
import { Merchant } from '../merchant/entities/merchant.entity';
import { User } from '../users/entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderedItem } from './entities/ordered-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(OrderedItem)
    private orderedItemRepository: Repository<OrderedItem>,
    @InjectRepository(Merchant) private merchantRepository: Repository<Merchant>
  ) {}

  async getOrders(user: User) {
    if (user.roles.includes('merchant')) {
      throw new NotImplementedException('Does not support merchants yet');
    }
    return await this.ordersRepository.find({
      where: {
        user: { id: user.id },
      },
    });
  }

  async getOrder(user: User, id: string) {
    const order = await this.ordersRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    if (!order) return new NotFoundException('Order does not exist');
    if (user.roles.includes('customer') && order.user.id !== user.id)
      throw new UnauthorizedException();
    if (user.roles.includes('merchant')) {
      throw new NotImplementedException('Does not support merchants yet');
    }

    return order;
  }

  async placeOrder(user: User, merchantId: string, quantity: number) {
    const merchant = await this.merchantRepository.findOneBy({
      id: merchantId,
    });
    if (!merchant)
      throw new BadRequestException(`Merchant ${merchantId} does not exist`);

    if (merchant.item.quantity < quantity)
      throw new BadRequestException(`Insufficient quantity available`);

    const orderedItem = await this.orderedItemRepository.save(<OrderedItem>{
      item: merchant.item,
      quantity: quantity,
    });

    merchant.item.quantity -= quantity;
    this.itemRepository.save(merchant.item);

    // save order
    return await this.ordersRepository.save({
      order_date: new Date(),
      deadline: new Date(),
      item: orderedItem,
      merchant: merchant,
      status: 'pending',
      total: 1234,
      user: user,
    });
  }
}
