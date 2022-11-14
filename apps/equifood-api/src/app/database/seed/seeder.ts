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

console.log(cwd());
const SEED_ASSET_PATH = join(cwd(), './src/app/database/seed/assets/');
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
    private itemRepository: Repository<Item>
  ) {}

  async seed() {
    await this.userRepository.insert({
      id: 'a1eb82d0-ee87-441f-87ef-0e5c26954c24',
      email: 'admin@example.com',
      passwordHash: hashPassword('password', ''),
      passwordSalt: '',
      first_name: 'John',
      last_name: 'Doe',
      phone: '(123) 456-789',
      roles: ['admin'],
    });

    await this.userRepository.insert({
      id: '314d472d-7b35-4b22-b823-256a2ec10fb0',
      email: 'customer@example.com',
      passwordHash: hashPassword('password', ''),
      passwordSalt: '',
      first_name: 'John',
      last_name: 'Doe',
      phone: '(123) 456-789',
      roles: ['customer'],
    });

    const banner1 = await this.uploadRepository.save(<Upload>{
      id: '6e8043ff-282e-44ae-af8b-90b5930a78d4',
      name: 'Fresh Slice Banner',
      filename: 'freshslice-banner.jpeg',
      ext: '.jpeg',
      mine_type: 'image/jpeg',
      path: SEED_ASSET_PATH + 'freshslice-banner.jpeg',
      size: statSync(SEED_ASSET_PATH + 'freshslice-banner.jpeg').size,
      upload_date: new Date(2022, 11, 8, 12),
    });

    const logo1 = await this.uploadRepository.save(<Upload>{
      id: 'a31389d3-8fbf-48d8-99a6-85b53edbef1d',
      name: 'Fresh Slice Logo',
      filename: 'freshslice-logo.png',
      ext: '.png',
      mine_type: 'image/png',
      path: SEED_ASSET_PATH + 'freshslice-logo.png',
      size: statSync(SEED_ASSET_PATH + 'freshslice-logo.png').size,
      upload_date: new Date(2022, 11, 8, 12),
    });

    const item1 = await this.itemRepository.save(<Item>{
      name: 'Example item',
      price: 10.99,
      //original price?
      quantity: 5,
    });

    await this.merchantRepository
      .save(<Merchant>{
        name: 'Fresh Slice',
        banner: banner1,
        logo: logo1,
        description: 'Order pizza',
        deadline: null,
        phone_number: '(123) 456-7890',
        location: {},
        items: [item1],
      })
      .then(console.log);
  }
}
