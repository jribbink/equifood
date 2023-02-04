import { Controller, Get, Param, Query } from '@nestjs/common';
import { MerchantsService } from './merchants.service';

@Controller('merchants')
export class MerchantsController {
  constructor(private merchantService: MerchantsService) {}

  @Get()
  getMerchants(@Query('q') searchQuery?: string) {
    if (searchQuery) {
      return this.merchantService.search(searchQuery);
    }
    return this.merchantService.getAll();
  }

  @Get(':merchantId')
  getItems(@Param('merchantId') merchantId: string) {
    return this.merchantService.get(merchantId);
  }
}
