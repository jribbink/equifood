import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Merchant } from './entities/merchant.entity';
import { MerchantsResolver } from './merchant.resolver';
import { MerchantsController } from './merchants.controller';
import { MerchantsService } from './merchants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Merchant, Item])],
  controllers: [MerchantsController],
  providers: [MerchantsService, MerchantsResolver],
})
export class MerchantsModule {}
