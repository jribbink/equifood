import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Item } from './items/entities/item.entity';
import { Merchant } from './entities/merchant.entity';
import { Like } from 'typeorm';
import { Upload } from '../uploads/entities/upload.entity';

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
      where: {
        name: Like(`%${searchQuery}%`),
      },
    });
  }

  async get(merchantId: string) {
    const merchant = await this.merchantRepository
      .createQueryBuilder('merchant')
      .innerJoinAndMapMany(
        'merchant.items',
        Item,
        'item',
        'item.merchantId = merchant.id'
      )
      .leftJoinAndMapOne(
        'merchant.logo',
        Upload,
        'logo',
        'merchant.logoId = logo.id'
      )
      .leftJoinAndMapOne(
        'merchant.banner',
        Upload,
        'banner',
        'merchant.bannerId = banner.id'
      )
      .where('merchant.id = :merchantId', {
        merchantId,
      })
      .getOne();

    if (!merchant) throw new NotFoundException();
    return merchant;
  }

  async getMerchantFromUser(user: User) {
    return this.merchantRepository.findOneBy({ user: { id: user.id } });
  }
}
