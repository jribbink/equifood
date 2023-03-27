import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { User } from './entities/user.entity';
import { TargetUserGuard } from './guards/target-user.guard';
import { TargetUser } from './decorators/target-user.decorator';
import { RealtimeRoute } from '../subscriptions/decorators/realtime-route.decorator';
import { Order } from '../orders/entities/order.entity';
import { Merchant } from '../merchant/entities/merchant.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(TargetUserGuard)
  @Get(':userId')
  async getProfile(@AuthUser() user: User, @TargetUser() targetUser: User) {
    return targetUser;
  }

  @UseGuards(TargetUserGuard)
  @Get(':userId/providers')
  async getProviders(@AuthUser() user: User) {
    return this.usersService.getProviders({ id: user.id });
  }

  @RealtimeRoute(
    Order,
    (user: User, orders: Order[]) => {
      return {
        where: {
          user: {
            id: user.id,
          },
        },
        relations: { merchant: true },
      };
    },
    { isArray: true }
  )
  @UseGuards(TargetUserGuard)
  @Get(':userId/orders')
  async getOrders(@TargetUser() user: User) {
    return this.usersService.getOrders(user);
  }

  @UseGuards(TargetUserGuard)
  @Get(':userId/savings')
  async getSavings(@TargetUser() user: User) {
    return this.usersService.getSavings(user);
  }
}
