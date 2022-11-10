import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Item } from '../merchant/entities/item.entity';
import { OrderedItem } from './entities/ordered-item.entity';
import { Merchant } from '../merchant/entities/merchant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Item, OrderedItem, Merchant])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}