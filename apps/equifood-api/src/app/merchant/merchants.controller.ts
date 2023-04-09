import {
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Order } from '../orders/entities/order.entity';
import { OrdersService } from '../orders/orders.service';
import { RealtimeRoute } from '../subscriptions/decorators/realtime-route.decorator';
import { UploadsService } from '../uploads/uploads.service';
import { User } from '../users/entities/user.entity';
import { TargetMerchant } from './decorators/target-merchant.decorator';
import { Merchant } from './entities/merchant.entity';
import { TargetMerchantGuard } from './guards/target-merchant-guard';
import { MerchantsService } from './merchants.service';
import { UpdateMerchantDto } from './models/update-merchant.dto';

@Controller('merchants')
export class MerchantsController {
  constructor(
    private merchantService: MerchantsService,
    private ordersService: OrdersService,
    private uploadsService: UploadsService
  ) {}

  @UseGuards(TargetMerchantGuard('restricted'))
  @Patch(':merchantId')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  )
  async update(
    @Body() updateMerchantDto: UpdateMerchantDto,
    @TargetMerchant() merchant: Merchant
  ) {
    return this.merchantService.update(merchant, updateMerchantDto);
  }

  @UseGuards(TargetMerchantGuard('restricted'))
  @Get(':merchantId/banner/nonce')
  async setBanner(@TargetMerchant() merchant: Merchant) {
    return this.uploadsService.createImageNonce(Merchant, 'banner', {
      id: merchant.id,
    });
  }

  @UseGuards(TargetMerchantGuard('restricted'))
  @Get(':merchantId/logo/nonce')
  async setLogo(@TargetMerchant() merchant: Merchant) {
    return this.uploadsService.createImageNonce(Merchant, 'logo', {
      id: merchant.id,
    });
  }

  @Get()
  @RealtimeRoute(Merchant, () => ({}), { isArray: true })
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
