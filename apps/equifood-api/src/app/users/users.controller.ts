import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { User } from './entities/user.entity';
import { UserGuard } from './guards/user.guard';
import { TargetUser } from './decorators/target-user.decorator';

@Controller('users/:userId')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(UserGuard)
  @Get('profile')
  async getProfile(@AuthUser() user: User, @TargetUser() targetUser: User) {
    return targetUser;
  }

  @UseGuards(UserGuard)
  @Get('orders')
  async getOrders(@TargetUser() user: User) {
    return this.usersService.getOrders(user);
  }
}
