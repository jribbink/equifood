import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Item } from './items/entities/item.entity';
import { Merchant } from './entities/merchant.entity';
import { Like } from 'typeorm';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
    @InjectRepository(Item) private itemRepository: Repository<Item>
  ) {}

  getAll() {
    return this.merchantRepository.find();
  }

  search(searchQuery: string) {
    return this.merchantRepository.find({
      where: [
        {
          name: Like(`%${searchQuery}%`),
        },
      ],
    });
  }

  async get(merchantId: string) {
    const merchant = await this.merchantRepository.findOne({
      where: { id: merchantId },
      relations: { items: true },
    });
    if (!merchant) throw new NotFoundException();
    return merchant;
  }

  async getMerchantFromUser(user: User) {
    return this.merchantRepository.findOneBy({ user: { id: user.id } });
  }
}
