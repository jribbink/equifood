import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { User } from './entities/user.entity';
import { TargetUserGuard } from './guards/target-user.guard';
import { TargetUser } from './decorators/target-user.decorator';
import { RealtimeRoute } from '../subscriptions/decorators/realtime-route.decorator';
import { Order } from '../orders/entities/order.entity';

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

  @RealtimeRoute<Order>(
    Order,
    (user: User) => {
      return {
        user: {
          id: user.id,
        },
      };
    },
    { isArray: true }
  )
  @UseGuards(TargetUserGuard)
  @Get(':userId/orders')
  async getOrders(@TargetUser() user: User) {
    return this.usersService.getOrders(user);
  }

  @RealtimeRoute(Order, (user: User) => {
    return {
      user: {
        id: user.id,
      },
    };
  })
  @UseGuards(TargetUserGuard)
  @Get(':userId/savings')
  async getSavings(@TargetUser() user: User) {
    return this.usersService.getSavings(user);
  }
}
