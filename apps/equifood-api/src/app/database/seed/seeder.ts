import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from '../../merchant/entities/merchant.entity';
import { User } from '../../users/entities/user.entity';
import { hashPassword } from '../../utils/crypto';

@Injectable()
export class Seeder {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async seed() {
    await this.userRepository.save({
      email: 'admin@example.com',
      passwordHash: hashPassword('password', ''),
      passwordSalt: '',
      first_name: 'John',
      last_name: 'Doe',
      phone: '(123) 456-789',
      roles: ['admin'],
    });

    await this.userRepository.save({
      email: 'customer@example.com',
      passwordHash: hashPassword('password', ''),
      passwordSalt: '',
      first_name: 'John',
      last_name: 'Doe',
      phone: '(123) 456-789',
      roles: ['customer'],
    });

    await this.merchantRepository.save({
      name: 'Fresh Slice',
      banner_url:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ubereats.com%2Fca%2Fstore%2Ffreshslice-pizza-pacific-blvd%2F39uW_A8vSVO0geSdOMEDpg&psig=AOvVaw3n-7XOwpjcqyDobMLWPmwr&ust=1667850691511000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNDS6pGqmvsCFQAAAAAdAAAAABAE',
      description: 'Order pizza',
      deadline: null,
      phone_number: '(123) 456-7890',
      location: {},
      price: 4.44,
      inventory: 2,
    });
  }
}
