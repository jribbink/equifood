import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { UuidEntity } from '../../database/models/uuid-entity';
import type { Merchant } from './merchant.entity';

// this entity should not be deleted to maintain order history
// instead when changes are made, a new item should be created to replace this one
// only should be deleted if no orders exist referencing this item
@Entity()
export class Item extends UuidEntity {
  @OneToOne<Merchant>('Merchant', (merchant) => merchant.item)
  merchant: Merchant;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  originalPrice: number;

  @Column()
  allergies?: string[];
}
