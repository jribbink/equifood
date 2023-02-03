import { Controller, Get, Param } from '@nestjs/common';
import { MerchantsService } from './merchants.service';

@Controller('merchants')
export class MerchantsController {
  constructor(private merchantService: MerchantsService) {}

  @Get()
  getMechants(@Param('searchQuery') searchQuery: string) {
    if(searchQuery){
      return this.merchantService.search(searchQuery);
    }else{
      return this.merchantService.getAll();
    }
  }

  @Get(':merchantId')
  getItems(@Param('merchantId') merchantId: string) {
    return this.merchantService.get(merchantId);
  }
}
