import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmSqlLiteTestingModule } from '../../../test-utils/typeorm-test.module';
import { Merchant } from './entities/merchant.entity';
import { MerchantsService } from './merchants.service';

describe('MerchantService', () => {
  let service: MerchantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmSqlLiteTestingModule([Merchant])],
      providers: [MerchantsService],
    }).compile();

    service = module.get<MerchantsService>(MerchantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
