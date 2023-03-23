import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AuthProvider } from '../auth/entities/auth-provider';
import { hashPassword } from '../common/utils/crypto';
import { Order } from '../orders/entities/order.entity';
import { User } from './entities/user.entity';
import { CreateUserDto } from './models/create-user.dto';
import crypto from 'crypto';

@Injectable()
export class UsersService {
  private validator;
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

  async createUser(createUserDto: CreateUserDto) {
    if (!createUserDto.roles.every((r) => r === 'customer')) {
      throw new BadRequestException('Invalid roles');
    }
    const user = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (user) {
      throw new BadRequestException(
        `An account with the email ${createUserDto.email} already exists`
      );
    }
    const salt = crypto.randomBytes(32).toString('hex');

    return this.userRepository.save(<User>{
      email: createUserDto.email,
      passwordHash: hashPassword(createUserDto.password, salt),
      passwordSalt: salt,
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      phone: createUserDto.phone,
      roles: createUserDto.roles,
    });
  }

  async getProviders(whereUser: FindOptionsWhere<User>) {
    return this.authProviderRepository.findBy({ user: whereUser });
  }
}
