import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from '../../merchant/entities/merchant.entity';
import { User } from '../../users/entities/user.entity';
import { hashPassword } from '../../common/utils/crypto';
import { Upload } from '../../uploads/entities/upload.entity';
import { statSync } from 'fs';
import { Item } from '../../merchant/entities/item.entity';
import { cwd } from 'process';
import { join } from 'path';
import { Order } from '../../orders/entities/order.entity';
import { OrderedItem } from '../../orders/entities/ordered-item.entity';

const SEED_ASSET_PATH = './src/app/database/seed/assets/';
@Injectable()
export class Seeder {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderedItem)
    private orderedItemRepository: Repository<OrderedItem>
  ) {}

  async seed() {
    await this.userRepository.save({
      id: 'a1eb82d0-ee87-441f-87ef-0e5c26954c24',
      email: 'admin@example.com',
      passwordHash: hashPassword('password', ''),
      passwordSalt: '',
      first_name: 'John',
      last_name: 'Doe',
      phone: '(123) 456-789',
      roles: ['admin'],
    });

    const customer = await this.userRepository.save({
      id: '314d472d-7b35-4b22-b823-256a2ec10fb0',
      email: 'customer@example.com',
      passwordHash: hashPassword('password', ''),
      passwordSalt: '',
      first_name: 'John',
      last_name: 'Doe',
      phone: '(123) 456-789',
      roles: ['customer'],
    });

    const merchantUser = await this.userRepository.save({
      id: '314d472d-7b35-4b22-b823-128a2ec10fb0',
      email: 'merchant@example.com',
      passwordHash: hashPassword('password', ''),
      passwordSalt: '',
      first_name: 'John',
      last_name: 'Doe',
      phone: '(123) 456-789',
      roles: ['merchant'],
    });

    const banner1 = await this.uploadRepository.save(<Upload>{
      id: '6e8043ff-282e-44ae-af8b-90b5930a78d4',
      name: 'Fresh Slice Banner',
      filename: 'freshslice-banner.jpeg',
      ext: '.jpeg',
      mime_type: 'image/jpeg',
      path: SEED_ASSET_PATH + 'freshslice-banner.jpeg',
      size: statSync(SEED_ASSET_PATH + 'freshslice-banner.jpeg').size,
      upload_date: new Date(2022, 11, 8, 12),
    });

    const logo1 = await this.uploadRepository.save(<Upload>{
      id: 'a31389d3-8fbf-48d8-99a6-85b53edbef1d',
      name: 'Fresh Slice Logo',
      filename: 'freshslice-logo.png',
      ext: '.png',
      mime_type: 'image/png',
      path: SEED_ASSET_PATH + 'freshslice-logo.png',
      size: statSync(SEED_ASSET_PATH + 'freshslice-logo.png').size,
      upload_date: new Date(2022, 11, 8, 12),
    });

    const item1 = await this.itemRepository.save(<Item>{
      name: 'Example item',
      price: 10.99,
      originalPrice: 20.0,
      quantity: 5,
      description: 'An ordinary item of food.',
    });

    const item2 = await this.itemRepository.save(<Item>{
      name: 'Cheese pizza',
      price: 4.99,
      originalPrice: 6.99,
      quantity: 5,
      description: 'A pizza with cheese on it.',
    });

    const item3 = await this.itemRepository.save(<Item>{
      name: 'Hawaiian pizza',
      price: 5.99,
      originalPrice: 8.49,
      quantity: 5,
      description: 'A pizza with cheese, tomato sauce, ham and pineapple.',
    });

    const merchant = await this.merchantRepository.save(<Merchant>{
      name: 'Fresh Slice',
      banner: banner1,
      logo: logo1,
      description: 'Order pizza',
      deadline: new Date(2022, 11, 8, 23),
      phone_number: '(123) 456-7890',
      location: {
        address: '975 Academy Way Unit # 120. Kelowna, BC V1V 3A4',
        latitude: 49.941,
        longitude: -119.386,
      },
      items: [item1],
      user: merchantUser,
    });

    const merchant2 = await this.merchantRepository.save(<Merchant>{
      name: 'Fresh Slice',
      banner: banner1,
      logo: logo1,
      description: 'Order pizza',
      deadline: new Date(2022, 11, 8, 23),
      phone_number: '(123) 456-7890',
      location: {
        address: '227 Bernard Ave. Kelowna, BC V1Y 6N2',
        latitude: 49.881,
        longitude: -119.44,
      },
      items: [item2],
      user: merchantUser,
    });

    const merchant3 = await this.merchantRepository.save(<Merchant>{
      name: 'Fresh Slice',
      banner: banner1,
      logo: logo1,
      description: 'Order pizza',
      deadline: new Date(2022, 11, 8, 23),
      phone_number: '(123) 456-7890',
      location: {
        address: '2271 Harvey Ave. Kelowna, BC V1Y 6H2',
        latitude: 49.886,
        longitude: -119.497,
      },
      items: [item3],
      user: merchantUser,
    });

    const orderedItem = await this.orderedItemRepository.save(<OrderedItem>{
      item: item1,
      quantity: 2,
    });

    await this.orderRepository.save({
      completed_date: new Date(2022, 11, 1, 22),
      deadline: new Date(2022, 11, 1, 22, 30),
      items: [orderedItem],
      merchant: merchant,
      order_date: new Date(2022, 11, 1, 21, 45),
      status: 'completed',
      total: 123,
      user: customer,
    });
  }
}
