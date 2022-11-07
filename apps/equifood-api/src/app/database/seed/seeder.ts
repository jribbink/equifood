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
        'https://d1ralsognjng37.cloudfront.net/a2e400d2-5526-44c2-bdf0-4bcc10ac59ef.jpeg',
      logo_url:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Freshslice_Pizza_logo.svg/1920px-Freshslice_Pizza_logo.svg.png',
      description: 'Order pizza',
      deadline: null,
      phone_number: '(123) 456-7890',
      location: {},
      price: 4.44,
      inventory: 2,
    });
    await this.merchantRepository.save({
      name: 'Fresh Slice',
      banner_url:
        'https://d1ralsognjng37.cloudfront.net/a2e400d2-5526-44c2-bdf0-4bcc10ac59ef.jpeg',
      logo_url:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Freshslice_Pizza_logo.svg/1920px-Freshslice_Pizza_logo.svg.png',
      description: 'Order pizza',
      deadline: null,
      phone_number: '(123) 456-7890',
      location: {},
      price: 4.44,
      inventory: 2,
    });
  }
}
