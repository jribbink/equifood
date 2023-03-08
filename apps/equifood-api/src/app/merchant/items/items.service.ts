import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { OrderedItem } from '../../orders/entities/ordered-item.entity';
import { Merchant } from '../entities/merchant.entity';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(Order) private orderRepository: Repository<Order>
  ) {}

  async getAll(merchantId: string) {
    return this.itemRepository.findBy({ merchant: { id: merchantId } });
  }

  async createItem(merchantId: string, item: Item) {
    return this.itemRepository.save({
      ...item,
      merchant: {
        id: merchantId,
      },
    });
  }

  async updateItem(
    merchantId: string,
    itemId: string,
    itemUpdates: Partial<Item>
  ) {
    // TODO: Do proper deserialize for itemUpdates
    delete itemUpdates.id;

    const item = await this.itemRepository.findOneBy({
      id: itemId,
      merchant: { id: merchantId },
    });
    if (!item) throw new NotFoundException('Item does not exist');

    const numOrders = await this.getDependentOrdersCount(merchantId, itemId);

    let savedItem: Item;
    if (numOrders === 0) {
      // Clone Item
      [savedItem] = await Promise.all([
        this.itemRepository.save({
          ...item,
          ...itemUpdates,
          merchant: { id: merchantId },
          id: undefined,
        }),
        this.deleteItem(merchantId, itemId),
      ]);
    } else {
      // Modifiy item since no dependents exist
      savedItem = await this.itemRepository.save({
        ...item,
        ...itemUpdates,
      });
    }

    return savedItem;
  }

  async deleteItem(merchantId: string, itemId: string) {
    const findByOptions = {
      id: itemId,
      merchant: {
        id: merchantId,
      },
    };

    const numOrders = await this.getDependentOrdersCount(merchantId, itemId);

    let res: DeleteResult | UpdateResult;
    if (numOrders === 0) {
      res = await this.itemRepository.delete(findByOptions);
    } else {
      res = await this.itemRepository.update(findByOptions, { deleted: true });
    }

    if (res.affected === 0) {
      throw new NotFoundException();
    }
  }

  async getDependentOrdersCount(merchantId: string, itemId: string) {
    return this.orderRepository.count({
      where: {
        items: {
          item: {
            id: itemId,
            merchant: {
              id: merchantId,
            },
          },
        },
      },
    });
  }
}
