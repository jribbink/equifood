import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from '../../merchant/entities/merchant.entity';
import { User } from '../../users/entities/user.entity';
import { hashPassword } from '../../common/utils/crypto';
import { Upload } from '../../uploads/entities/upload.entity';
import { statSync } from 'fs';
import { Item } from '../../merchant/items/entities/item.entity';
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

    const merchantUser2 = await this.userRepository.save({
      id: '314d472d-7b35-4b22-b823-128a2ec10fb1',
      email: 'merchant2@example.com',
      passwordHash: hashPassword('password', ''),
      passwordSalt: '',
      first_name: 'John',
      last_name: 'Doe',
      phone: '(123) 456-789',
      roles: ['merchant'],
    });

    const merchantUser3 = await this.userRepository.save({
      id: '314d472d-7b35-4b22-b823-128a2ec10fb2',
      email: 'merchant3@example.com',
      passwordHash: hashPassword('password', ''),
      passwordSalt: '',
      first_name: 'John',
      last_name: 'Doe',
      phone: '(123) 456-789',
      roles: ['merchant'],
    });

    const adminUser = await this.userRepository.save({
      id: '314d472d-7b35-4b22-b823-128a2ec10fb3',
      email: 'admin@example.com',
      passwordHash: hashPassword('password', ''),
      passwordSalt: '',
      first_name: 'John',
      last_name: 'Doe',
      phone: '(123) 456-789',
      roles: ['admin'],
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

    const banner2 = await this.uploadRepository.save(<Upload>{
      id: '6e8043ff-282e-44ae-af8b-90b5930a78d5',
      name: 'Shoreline Banner',
      filename: 'shoreline-banner.jpg',
      ext: '.jpg',
      mime_type: 'image/jpg',
      path: SEED_ASSET_PATH + 'shoreline-banner.jpg',
      size: statSync(SEED_ASSET_PATH + 'shoreline-banner.jpg').size,
      upload_date: new Date(2023, 0, 25, 12),
    });

    const banner3 = await this.uploadRepository.save(<Upload>{
      id: '6e8043ff-282e-44ae-af8b-90b5930a78d6',
      name: 'Hillcrest Cafe',
      filename: 'hillcrest-banner.jpeg',
      ext: '.jpeg',
      mime_type: 'image/jpeg',
      path: SEED_ASSET_PATH + 'hillcrest-banner.jpeg',
      size: statSync(SEED_ASSET_PATH + 'hillcrest-banner.jpeg').size,
      upload_date: new Date(2023, 0, 25, 12),
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

    const logo2 = await this.uploadRepository.save(<Upload>{
      id: 'a31389d3-8fbf-48d8-99a6-85b53edbef1e',
      name: 'Shoreline Brewing Logo',
      filename: 'shoreline-logo.png',
      ext: '.png',
      mime_type: 'image/png',
      path: SEED_ASSET_PATH + 'shoreline-logo.png',
      size: statSync(SEED_ASSET_PATH + 'shoreline-logo.png').size,
      upload_date: new Date(2023, 0, 25, 12),
    });

    const logo3 = await this.uploadRepository.save(<Upload>{
      id: 'a31389d3-8fbf-48d8-99a6-85b53edbef1f',
      name: 'Hillcrest Cafe Logo',
      filename: 'hillcrest-logo.png',
      ext: '.png',
      mime_type: 'image/png',
      path: SEED_ASSET_PATH + 'hillcrest-logo.png',
      size: statSync(SEED_ASSET_PATH + 'hillcrest-logo.png').size,
      upload_date: new Date(2023, 0, 25, 12),
    });

    const item1 = await this.itemRepository.save(<Item>{
      name: 'Pepperoni pizza',
      price: 10.99,
      originalPrice: 20.0,
      quantity: 20,
      description: 'A pizza with pepperoni on it.',
    });

    const item2 = await this.itemRepository.save(<Item>{
      name: 'Cheese pizza',
      price: 4.99,
      originalPrice: 6.99,
      quantity: 20,
      description: 'A pizza with cheese on it.',
    });

    const item3 = await this.itemRepository.save(<Item>{
      name: 'Hawaiian pizza',
      price: 5.99,
      originalPrice: 8.49,
      quantity: 20,
      description: 'A pizza with cheese, tomato sauce, ham and pineapple.',
    });

    const item4 = await this.itemRepository.save(<Item>{
      name: 'Popcorn',
      price: 2.99,
      originalPrice: 4,
      quantity: 20,
      description:
        'Fresh, house-made vegan popcorn with chili lime salt and garlic butter',
    });

    const item5 = await this.itemRepository.save(<Item>{
      name: 'Fish tacos',
      price: 11.99,
      originalPrice: 15,
      quantity: 20,
      description:
        'Two crispy cod tacos, aji panca slaw, pickled red onion, aji panca crema, cilantro',
    });

    const item6 = await this.itemRepository.save(<Item>{
      name: 'German Bratwurst',
      price: 7.99,
      originalPrice: 10,
      quantity: 20,
      description:
        'House made bratwurst with sauerkraut and spicy mustard, served on a bun. No side.',
    });

    const item7 = await this.itemRepository.save(<Item>{
      name: 'Beef Samosas',
      price: 10,
      originalPrice: 12,
      quantity: 20,
      description:
        'Beef, pea and potato samosas, baked in-house. Comes with dip',
    });

    const item8 = await this.itemRepository.save(<Item>{
      name: 'Butter chicken pizza',
      price: 11.99,
      originalPrice: 15,
      quantity: 20,
      description: 'A pizza made with butter chicken',
    });

    const item9 = await this.itemRepository.save(<Item>{
      name: 'Veggie Samosas',
      price: 10,
      originalPrice: 12,
      quantity: 20,
      description: 'Samosas made with all veggies',
    });

    const merchant = await this.merchantRepository.save(<Merchant>{
      id: 'a31381d4-8fbf-10d8-99a6-85b53edbef1d',
      name: 'Fresh Slice',
      banner: banner1,
      logo: logo1,
      description: 'Freshest pizza in Okanagan Since 1999',
      deadline: new Date(2022, 11, 8, 23),
      phone_number: '(123) 456-7890',
      location: {
        address: '975 Academy Way Unit # 120. Kelowna, BC V1V 3A4',
        latitude: 49.941,
        longitude: -119.386,
      },
      items: [item1, item2, item3],
      user: merchantUser,
    });

    const merchant2 = await this.merchantRepository.save(<Merchant>{
      name: 'Shoreline Brewing',
      banner: banner2,
      logo: logo2,
      description: 'Creative Comfort Food',
      deadline: new Date(2022, 11, 8, 23),
      phone_number: '(123) 456-7890',
      location: {
        address: '3477 Lakeshore Rd # 116. Kelowna, BC V1W 0A9',
        latitude: 49.855,
        longitude: -119.489,
      },
      items: [item4, item5, item6],
      user: merchantUser2,
    });

    //temp, replace with new one
    const merchant3 = await this.merchantRepository.save(<Merchant>{
      name: 'Hillcrest Cafe',
      banner: banner3,
      logo: logo3,
      description: 'Fresh ingredients, local food',
      deadline: new Date(2022, 11, 8, 23),
      phone_number: '(123) 456-7890',
      location: {
        address: '700 Hwy 33. Kelowna, BC V1X 7W4',
        latitude: 49.883,
        longitude: -119.372,
      },
      items: [item7, item8, item9],
      user: merchantUser3,
    });

    const orderedItem = await this.orderedItemRepository.save(<OrderedItem>{
      item: item1,
      quantity: 2,
    });

    const order = await this.orderRepository.save({
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
