import { Column, Entity, ManyToOne } from 'typeorm';
import { UuidEntity } from '../../database/models/uuid-entity';
import { Item } from '../../merchant/entities/item.entity';
import type { Order } from './order.entity';

@Entity()
export class OrderedItem extends UuidEntity {
  @ManyToOne<Order>('Order', (order) => order.items)
  order: Order;

  @ManyToOne(() => Item, { eager: true })
  item: Item;

  @Column()
  quantity: number;
}
