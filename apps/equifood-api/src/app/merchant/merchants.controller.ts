import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Order } from '../orders/entities/order.entity';
import { OrdersService } from '../orders/orders.service';
import { RealtimeRoute } from '../subscriptions/decorators/realtime-route.decorator';
import { User } from '../users/entities/user.entity';
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

  @RealtimeRoute(Merchant, () => ({}), { isArray: true })
  @Get()
  getMerchants(@Query('q') searchQuery?: string) {
    if (searchQuery) {
      return this.merchantService.search(searchQuery);
    }
    return this.merchantService.getAll();
  }

  @RealtimeRoute(
    Merchant,
    (_, merchant: Merchant) => ({
      id: merchant.id,
    }),
    { isArray: true }
  )
  @UseGuards(TargetMerchantGuard('any'))
  @Get(':merchantId')
  async getMerchant(@TargetMerchant() targetMerchant: Merchant) {
    return this.merchantService.get(targetMerchant.id);
  }

  @RealtimeRoute(
    Order,
    (user: User, orders: Order[]) => {
      return {
        merchant: {
          user: {
            id: user.id,
          },
        },
      };
    },
    { isArray: true }
  )
  @UseGuards(TargetMerchantGuard('restricted'))
  @Get(':merchantId/orders')
  async getOrders(@TargetMerchant() targetMerchant: Merchant) {
    return this.ordersService.getMerchantOrders({ id: targetMerchant.id });
  }
}
