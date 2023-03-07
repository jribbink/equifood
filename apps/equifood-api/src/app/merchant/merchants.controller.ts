import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthRoute } from '../auth/decorators/auth-route.decorator';
import { OrdersService } from '../orders/orders.service';
import { TargetMerchant } from './decorators/target-merchant.decorator';
import { Merchant } from './entities/merchant.entity';
import { TargetMerchantGuard } from './guards/target-merchant-guard';
import { MerchantsService } from './merchants.service';

@Controller('merchants')
export class MerchantsController {
  constructor(
    private merchantService: MerchantsService,
    private ordersService: OrdersService
  ) {}

  @Get()
  getMerchants(@Query('q') searchQuery?: string) {
    if (searchQuery) {
      return this.merchantService.search(searchQuery);
    }
    return this.merchantService.getAll();
  }

  @UseGuards(TargetMerchantGuard('any'))
  @AuthRoute('merchant')
  @Get(':merchantId')
  async getMerchant(@TargetMerchant() targetMerchant: Merchant) {
    return targetMerchant;
  }

  @UseGuards(TargetMerchantGuard('restricted'))
  @AuthRoute('merchant')
  @Get(':merchantId/orders')
  async getOrders(@TargetMerchant() targetMerchant: Merchant) {
    return this.ordersService.getMerchantOrders({ id: targetMerchant.id });
  }
}
