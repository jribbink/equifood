import { Controller, Get } from '@nestjs/common';
import { MerchantsService } from './merchants.service';

@Controller('merchants')
export class MerchantsController {
  constructor(private merchantService: MerchantsService) {}

  @Get()
  getMechants() {
    return this.merchantService.getAll();
  }
}
