import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UuidEntity } from '../../../database/models/uuid-entity';
import type { Merchant } from '../../../merchant/entities/merchant.entity';
import {
  IsBoolean,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  name?: string;

  @Field()
  @Column()
  @IsString()
  @MinLength(0)
  @MaxLength(256)
  description: string;

  @Field()
  @Column()
  @IsNumber({
    maxDecimalPlaces: 0,
  })
  quantity: number;

  @Field()
  @Column()
  @IsNumber({
    maxDecimalPlaces: 0,
  })
  price: number;

  @Field()
  @Column()
  @IsNumber({
    maxDecimalPlaces: 0,
  })
  originalPrice: number;

  @Field((type) => [String])
  @Column({ default: '', type: 'simple-array' })
  allergies: string[];

  @Field()
  @Column({ default: false })
  @IsBoolean()
  deleted?: boolean;
}
