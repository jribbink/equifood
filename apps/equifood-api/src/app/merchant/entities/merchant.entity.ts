import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { UploadColumn } from '../../common/decorators/upload-column';
import { RealtimeEntity } from '../../subscriptions/decorators/realtime-entity.decorator';
import { Upload } from '../../uploads/entities/upload.entity';
import { User } from '../../users/entities/user.entity';
import type { Item } from '../items/entities/item.entity';

@RealtimeEntity(
  {
    items: true,
  },
  {}
)
@Entity()
@ObjectType()
export class Merchant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  name: string;

  @UploadColumn()
  banner: Relation<Upload>;

  @UploadColumn()
  logo: Relation<Upload>;

  @Field()
  @Column()
  description: string;

  @Column({ type: 'simple-json' })
  location: object;

  @Field()
  @Column()
  phone_number: string;

  @OneToMany<Item>('Item', (o) => o.merchant)
  items: Item[];

  @Column({ nullable: true })
  deadline: Date | null;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;
}
