import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Merchant } from '../../merchant/entities/merchant.entity';
import { User } from '../../users/entities/user.entity';
import { OrderedItem } from './ordered-item.entity';

@ObjectType()
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  order_date: Date;

  @Field()
  @Column({ nullable: true })
  completed_date?: Date;

  @ManyToOne(() => User)
  user: User;

  @Field()
  @Type(() => Merchant)
  @ManyToOne(() => Merchant, { eager: true })
  merchant: Merchant;

  @Field()
  @Column()
  deadline: Date;

  @Field()
  @Column()
  status: 'pending' | 'completed' | 'cancelled';

  @Field(() => [OrderedItem])
  @OneToMany<OrderedItem>('OrderedItem', (orderedItem) => orderedItem.order, {
    eager: true,
  })
  items: OrderedItem[];

  @Field()
  @Column()
  total: number;
}
