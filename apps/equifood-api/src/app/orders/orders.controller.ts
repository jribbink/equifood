import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from '../users/entities/user.entity';
import { OrderedItemDTO } from './models/ordered-item.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard('customer', 'merchant'))
  @Get(':orderId')
  async getOrder(@AuthUser() user: User, @Param('orderId') orderId: string) {
    return await this.ordersService.getOrder(user, orderId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard('customer', 'merchant'))
  @Get()
  async getOrders(@AuthUser() user: User) {
    return await this.ordersService.getOrders(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard('customer'))
  @Post()
  async placeOrder(
    @AuthUser() user: User,
    @Body('merchant') merchantId: string,
    @Body('items') items: OrderedItemDTO[]
  ) {
    return await this.ordersService.placeOrder(user, merchantId, items);
  }
}
