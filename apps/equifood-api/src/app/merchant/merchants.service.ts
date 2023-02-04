import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, serialize } from 'class-transformer';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Item } from './entities/item.entity';
import { Merchant } from './entities/merchant.entity';

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
