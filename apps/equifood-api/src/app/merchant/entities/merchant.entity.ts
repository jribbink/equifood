import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { UploadColumn } from '../../common/decorators/upload-column';
import { UuidEntity } from '../../database/models/uuid-entity';
import { Upload } from '../../uploads/entities/upload.entity';
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

  @OneToMany<Item>('Item', (o) => o.merchant)
  items: Item[];

  @Column({ nullable: true })
  deadline: Date | null;
}
