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
export class Merchant extends UuidEntity {
  @Column()
  name: string;

  @UploadColumn()
  banner: Upload;

  @UploadColumn()
  logo: Relation<Upload>;

  @Column()
  description: string;

  @Column({ type: 'simple-json' })
  location: object;

  @Column()
  phone_number: string;

  @OneToOne<Item>('Item', (o) => o.merchant, { eager: true })
  @JoinColumn()
  item: Item;

  @Column({ nullable: true })
  deadline: Date | null;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;
}
