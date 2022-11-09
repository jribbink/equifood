import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, serialize } from 'class-transformer';
import { Repository } from 'typeorm';
import { Merchant } from './entities/merchant.entity';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant) private merchantRepository: Repository<Merchant>
  ) {}

  getAll() {
    return this.merchantRepository.find();
  }
}
