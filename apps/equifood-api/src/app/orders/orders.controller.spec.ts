import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmSqlLiteTestingModule } from '../../test-utils/typeorm-test.module';
import { Item } from '../merchant/entities/item.entity';
import { Merchant } from '../merchant/entities/merchant.entity';
import { Order } from './entities/order.entity';
import { OrderedItem } from './entities/ordered-item.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UsersModule } from '../users/users.module';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
      imports: [
        TypeOrmSqlLiteTestingModule([Merchant, OrderedItem, Order, Item]),
        UsersModule,
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
