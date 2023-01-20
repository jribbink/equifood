import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthRoute } from '../auth/decorators/auth-route.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { OrderedItemDTO } from './models/ordered-item.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @AuthRoute()
  @Get(':orderId')
  async getOrder(@AuthUser() user: User, @Param('orderId') orderId: number) {
    return await this.ordersService.getOrder(user, orderId);
  }

  @AuthRoute('customer')
  @Post()
  async placeOrder(
    @AuthUser() user: User,
    @Body('merchant') merchantId: string,
    @Body('items') items: OrderedItemDTO[]
  ) {
    return await this.ordersService.placeOrder(user, merchantId, items);
  }
}
