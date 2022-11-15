import { Test, TestingModule } from '@nestjs/testing';
import { Merchant } from './entities/merchant.entity';
import { MerchantsController } from './merchants.controller';
import { MerchantsService } from './merchants.service';
import { TypeOrmSqlLiteTestingModule } from '../../test-utils/typeorm-test.module';
import { Item } from './entities/item.entity';

describe('MerchantsController', () => {
  let controller: MerchantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmSqlLiteTestingModule([Merchant, Item])],
      controllers: [MerchantsController],
      providers: [MerchantsService],
    }).compile();

    controller = module.get<MerchantsController>(MerchantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
