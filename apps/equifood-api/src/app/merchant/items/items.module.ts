import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { UsersModule } from '../../users/users.module';
import { Merchant } from '../entities/merchant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Merchant]), UsersModule],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
