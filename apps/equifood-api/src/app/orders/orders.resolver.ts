import { UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { AuthRoute } from '../auth/decorators/auth-route.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TargetUser } from '../users/decorators/target-user.decorator';
import { User } from '../users/entities/user.entity';
import { TargetUserGuard } from '../users/guards/target-user.guard';
import { Order } from './entities/order.entity';
import { OrderedItemDTO } from './models/ordered-item.dto';
import { OrdersService } from './orders.service';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private ordersService: OrdersService) {}

  @AuthRoute('customer')
  @Query((returns) => Order)
  async order(@Args('id') id: number, @AuthUser() user: User): Promise<Order> {
    return this.ordersService.getOrder(user, id);
  }

  @UseGuards(TargetUserGuard)
  @AuthRoute('customer')
  @Query((returns) => [Order], {
    description: 'Gets all orders for authenticated user',
  })
  async orders(
    @Args('targetUserId', { nullable: true }) targetUserId: string,
    @TargetUser() targetUser: User
  ): Promise<Order[]> {
    return this.ordersService.getOrders(targetUser);
  }

  @AuthRoute('customer')
  @Mutation((returns) => Order)
  async placeOrder(
    @Args('merchantId') merchantId: string,
    @Args({ name: 'items', type: () => [OrderedItemDTO] })
    items: OrderedItemDTO[]
  ): Promise<Order> {
    const user = null;
    return this.ordersService.placeOrder(user, merchantId, items);
  }
}
