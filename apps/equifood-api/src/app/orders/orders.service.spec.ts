import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmSqlLiteTestingModule } from '../../test-utils/typeorm-test.module';
import { Item } from '../merchant/entities/item.entity';
import { Merchant } from '../merchant/entities/merchant.entity';
import { User } from '../users/entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderedItem } from './entities/ordered-item.entity';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
      imports: [
        TypeOrmSqlLiteTestingModule([Item, OrderedItem, Merchant, Order, User]),
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
