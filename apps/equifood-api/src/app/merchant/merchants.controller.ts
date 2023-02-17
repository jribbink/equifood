import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { AuthRoute } from '../auth/decorators/auth-route.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { MerchantsService } from './merchants.service';

@Controller('merchants')
export class MerchantsController {
  constructor(private merchantService: MerchantsService) {}

  @Get()
  getMechants() {
    return this.merchantService.getAll();
  }

  @AuthRoute('merchant')
  @Get('self')
  async getSelfMerchant(
    @Param('merchantId') merchantId: string,
    @AuthUser() user: User
  ) {
    const merchant = await this.merchantService.getMerchantFromUser(user);
    if (!merchant) {
      return new BadRequestException(
        'This account is not connected to a merchant!'
      );
    }
    return this.merchantService.get(merchant.id);
  }
}
