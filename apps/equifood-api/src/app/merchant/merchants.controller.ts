import { Controller, Get, Param } from '@nestjs/common';
import { MerchantsService } from './merchants.service';

@Controller('merchants')
export class MerchantsController {
  constructor(private merchantService: MerchantsService) {}

  @Get()
  getAllMechants() {
    console.log('help');
    return this.merchantService.getAll();
  }

  @Get(':searchQuery')
  getFilteredMechants(@Param('searchQuery') searchQuery: string) {
    return this.merchantService.search(searchQuery);
  }

  @Get(':merchantId')
  getItems(@Param('merchantId') merchantId: string) {
    return this.merchantService.get(merchantId);
  }
}
