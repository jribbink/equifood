import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UuidEntity } from '../../../database/models/uuid-entity';
import type { Merchant } from '../../../merchant/entities/merchant.entity';

// this entity should not be deleted to maintain order history
// instead when changes are made, a new item should be created to replace this one
// only should be deleted if no orders exist referencing this item
@ObjectType()
@Entity()
export class Item extends UuidEntity {
  @ManyToOne<Merchant>('Merchant', (merchant) => merchant.items)
  merchant: Merchant;

  @Field()
  @Column({ nullable: true })
  name?: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  originalPrice: number;

  @Field((type) => [String])
  @Column({ default: '', type: 'simple-array' })
  allergies: string[];
}
