import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UuidEntity } from '../../database/models/uuid-entity';
import { Item } from '../../merchant/entities/item.entity';
import { Order } from './order.entity';

@ObjectType()
@Entity()
export class OrderedItem extends UuidEntity {
  @Field()
  public id: string;

  @Field((type) => Order)
  @ManyToOne<Order>('Order', (order) => order.items)
  order: Order;

  @Field()
  @ManyToOne(() => Item, { eager: true })
  item: Item;

  @Column()
  quantity: number;
}
