import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthRoute } from '../auth/decorators/auth-route.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { ORDER_STATUS } from '@equifood/api-interfaces';
import { OrderedItemDTO } from './models/ordered-item.dto';
import { OrdersService } from './orders.service';
import { RealtimeRoute } from '../subscriptions/decorators/realtime-route.decorator';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @AuthRoute('customer', 'merchant')
  @Post(':orderId/status')
  async setOrderStatus(
    @AuthUser() user: User,
    @Param('orderId') orderId: number,
    @Body('status') status: ORDER_STATUS
  ) {
    await this.ordersService.setOrderStatus(user, orderId, status);
  }

  @RealtimeRoute(Order, (user: User, order: Order) => ({
    id: order.id,
  }))
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
