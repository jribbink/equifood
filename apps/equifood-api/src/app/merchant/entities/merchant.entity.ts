import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  Relation,
} from 'typeorm';
import { UploadColumn } from '../../common/decorators/upload-column';
import { UuidEntity } from '../../database/models/uuid-entity';
import { Upload } from '../../uploads/entities/upload.entity';
import { User } from '../../users/entities/user.entity';
import type { Item } from './item.entity';

@Entity()
@ObjectType()
export class Merchant extends UuidEntity {
  @Field()
  @Column()
  name: string;

  @UploadColumn()
  banner: Upload;

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
