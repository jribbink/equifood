import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AuthProvider } from '../auth/entities/auth-provider';
import { Order } from '../orders/entities/order.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private validator
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(AuthProvider)
    private authProviderRepository: Repository<AuthProvider>
  ) {}

  async findOne(fields: FindOptionsWhere<User>): Promise<User> {
    return this.userRepository.findOne({ where: fields });
  }

  async getOrders(user: User) {
    return this.orderRepository.find({ where: { user: { id: user.id } } });
  }

  async getSavings(user: User) {
    const { savings } = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.user', 'user')
      .leftJoin('order.items', 'orderedItem')
      .leftJoin('orderedItem.item', 'item')
      .where('user.id = :id', { id: user.id })
      .select(
        'SUM(item.originalPrice * orderedItem.quantity) - SUM(item.price * orderedItem.quantity)',
        'savings'
      )
      .getRawOne();
    return savings;
  }

  async createUser(user: Partial<User>) {
    return this.userRepository.create(user);
  }

  async getProviders(whereUser: FindOptionsWhere<User>) {
    return this.authProviderRepository.findBy({ user: whereUser });
  }
}
