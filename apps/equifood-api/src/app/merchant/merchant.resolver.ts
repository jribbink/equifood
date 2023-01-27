import { Args, Query, Resolver } from '@nestjs/graphql';
import { Merchant } from './entities/merchant.entity';
import { MerchantsService } from './merchants.service';

@Resolver(() => Merchant)
export class MerchantsResolver {
  constructor(private merchantsService: MerchantsService) {}

  @Query((returns) => Merchant)
  async merchant(@Args('id') id: string): Promise<Merchant> {
    return this.merchantsService.get(id);
  }

  @Query((returns) => [Merchant])
  async merchants(): Promise<Merchant[]> {
    return this.merchantsService.getAll();
  }
}
