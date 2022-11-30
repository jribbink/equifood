import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Merchant } from './entities/merchant.entity';
import { MerchantsService } from './merchants.service';

@Resolver(() => Merchant)
export class MerchantsResolver {
  constructor(private merchantsService: MerchantsService) {}

  @Query((returns) => Merchant)
  async getMerchant(@Args('id') id: string): Promise<Merchant> {
    return this.merchantsService.get(id);
  }

  /*@Query((returns) => Merchant)
  async allMerchants(): Promise<Merchant[]> {
    return this.merchantsService.getAll();
  }*/
}
