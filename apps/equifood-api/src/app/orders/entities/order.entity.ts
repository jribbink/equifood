import { ORDER_STATUS } from '@equifood/api-interfaces';
import { Field, ObjectType } from '@nestjs/graphql';
import { xor, lshift, rshift, and } from '../../../utils/bitwise53';
import { Type } from 'class-transformer';
import {
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Merchant } from '../../merchant/entities/merchant.entity';
import { RealtimeEntity } from '../../subscriptions/decorators/realtime-entity.decorator';
import { User } from '../../users/entities/user.entity';
import { OrderedItem } from './ordered-item.entity';

const ORDER_CODEWORD = 'EQUIFOOD';
const CIPHER = and(
  xor(
    xor(lshift(parseInt(ORDER_CODEWORD, 36), 1), parseInt(ORDER_CODEWORD, 36)),
    rshift(parseInt(ORDER_CODEWORD, 36), 1)
  ),
  lshift(1, 31) - 1
);
@ObjectType()
@Entity()
@RealtimeEntity<Order>({ user: true, merchant: { user: true } }, {})
export class Order {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  reference_code: string;
  @AfterLoad()
  private setReferenceCode() {
    this.reference_code = xor(CIPHER, this.id).toString(36).toUpperCase();
  }

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

  @Field(() => Number)
  @Column({ type: 'integer' })
  status: ORDER_STATUS;

  @Field(() => [OrderedItem])
  @OneToMany<OrderedItem>('OrderedItem', (orderedItem) => orderedItem.order, {
    eager: true,
  })
  items: OrderedItem[];

  @Field()
  @Column()
  total: number;
}
