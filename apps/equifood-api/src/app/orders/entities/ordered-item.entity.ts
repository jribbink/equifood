import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../../merchant/items/entities/item.entity';
import { Order } from './order.entity';

@ObjectType()
@Entity()
export class OrderedItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field((type) => Order)
  @ManyToOne<Order>('Order', (order) => order.items)
  order: Order;

  @Field()
  @ManyToOne(() => Item, { eager: true })
  item: Item;

  @Column()
  quantity: number;
}
