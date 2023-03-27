import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthRoute } from '../auth/decorators/auth-route.decorator';
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

  @Get()
  getMerchants(@Query('q') searchQuery?: string) {
    if (searchQuery) {
      return this.merchantService.search(searchQuery);
    }
    return this.merchantService.getAll();
  }

  @UseGuards(TargetMerchantGuard('any'))
  @Get(':merchantId')
  async getMerchant(@TargetMerchant() targetMerchant: Merchant) {
    return this.merchantService.get(targetMerchant.id);
  }

  @RealtimeRoute(
    Order,
    (user: User, orders: Order[]) => {
      return {
        where: {
          merchant: {
            user: {
              id: user.id,
            },
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
