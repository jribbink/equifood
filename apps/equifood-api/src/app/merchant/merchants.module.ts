import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from '../orders/orders.module';
import { Item } from './items/entities/item.entity';
import { Merchant } from './entities/merchant.entity';
import { MerchantsResolver } from './merchant.resolver';
import { MerchantsController } from './merchants.controller';
import { MerchantsService } from './merchants.service';
import { UsersModule } from '../users/users.module';
import { ItemsModule } from './items/items.module';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Merchant, Item]),
    OrdersModule,
    UsersModule,
    ItemsModule,
    UploadsModule,
  ],
  exports: [MerchantsService],
  controllers: [MerchantsController],
  providers: [MerchantsService, MerchantsResolver],
})
export class MerchantsModule {}
