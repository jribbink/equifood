import { Injectable } from '@nestjs/common';
import { NotImplementedError } from 'adminjs';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(private itemRepository: Repository<Item>) {}

  async getAll(merchantId: string) {
    return this.itemRepository.findBy({ merchant: { id: merchantId } });
  }

  async createItem(merchantId: string, item: Item) {
    throw new NotImplementedError('need to handle merchantiD');
    return this.itemRepository.save(item);
  }

  async updateItem(merchantId: string, item: Partial<Item>) {
    throw new NotImplementedError('need to handle merchantiD');
    return this.itemRepository.update({ id: item.id }, item);
  }
}
