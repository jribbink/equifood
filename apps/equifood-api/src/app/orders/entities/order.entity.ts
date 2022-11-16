import { Type } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UuidEntity } from '../../database/models/uuid-entity';
import { Merchant } from '../../merchant/entities/merchant.entity';
import { User } from '../../users/entities/user.entity';
import type { OrderedItem } from './ordered-item.entity';

@Entity()
export class Order extends UuidEntity {
  @Column()
  order_date: Date;

  @Column({ nullable: true })
  completed_date?: Date;

  @ManyToOne(() => User)
  user: User;

  @Type(() => Merchant)
  @ManyToOne(() => Merchant, { eager: true })
  merchant: Merchant;

  @Column()
  deadline: Date;

  @Column()
  status: 'pending' | 'completed' | 'cancelled';

  @OneToMany<OrderedItem>('OrderedItem', (orderedItem) => orderedItem.order, {
    eager: true,
  })
  items: OrderedItem[];

  @Column()
  total: number;
}
