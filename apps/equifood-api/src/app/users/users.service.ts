import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>
  ) {}

  async findOne(fields: FindOptionsWhere<User>): Promise<User> {
    return this.userRepository.findOne({ where: fields });
  }

  async getOrders(user: User) {
    return this.orderRepository.find({ where: { user: { id: user.id } } });
  }
}
