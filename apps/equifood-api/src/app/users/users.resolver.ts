import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthRoute } from '../auth/decorators/auth-route.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { AuthProvider } from '../auth/entities/auth-provider';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { TargetUser } from './decorators/target-user.decorator';
import { TargetUserGuard } from './guards/target-user.guard';

import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(TargetUserGuard)
  @AuthRoute()
  @Query((returns) => User, {
    description:
      "Get the specified target user's profile if sufficient permissions exist",
  })
  async getProfile(
    @AuthUser() user: User,
    @TargetUser() targetUser: User,
    @Args('targetUserId', { nullable: true }) targetUserId: string
  ): Promise<User> {
    return this.usersService.findOne({ id: targetUser.id });
  }

  @AuthRoute()
  @Query((returns) => [AuthProvider], {
    description: 'Gets all providers for specified user',
  })
  async getProviders(@AuthUser() user: User): Promise<AuthProvider[]> {
    return this.usersService.getProviders({ id: user.id });
  }
}
