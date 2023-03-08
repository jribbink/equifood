import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PartialBody } from '../../common/decorators/partial-body.decorator';
import { TargetMerchant } from '../decorators/target-merchant.decorator';
import { Merchant } from '../entities/merchant.entity';
import { TargetMerchantGuard } from '../guards/target-merchant-guard';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

@Controller('/merchants/:merchantId/items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @UseGuards(TargetMerchantGuard('any'))
  @Get()
  getItems(@TargetMerchant() targetMerchant: Merchant) {
    return this.itemsService.getAll(targetMerchant.id);
  }

  @UseGuards(TargetMerchantGuard('restricted'))
  @Post()
  createItem(@TargetMerchant() targetMerchant: Merchant, @Body() item: Item) {
    console.log(item);
    return this.itemsService.createItem(targetMerchant.id, item);
  }

  @UseGuards(TargetMerchantGuard('restricted'))
  @Patch(':itemId')
  updateItem(
    @TargetMerchant() targetMerchant: Merchant,
    @Param('itemId') itemId: string,
    @Body() _item: Item
  ) {
    const item = _item as Partial<Item>;
    console.log(item.description);
    return this.itemsService.updateItem(targetMerchant.id, itemId, item);
  }

  @UseGuards(TargetMerchantGuard('restricted'))
  @Delete(':itemId')
  async deleteItem(
    @TargetMerchant() targetMerchant: Merchant,
    @Param('itemId') itemId: string
  ) {
    await this.itemsService.deleteItem(targetMerchant.id, itemId);
  }
}
