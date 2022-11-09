import { Column, Entity, Relation } from 'typeorm';
import { UploadColumn } from '../../common/decorators/upload-column';
import { UuidEntity } from '../../database/models/uuid-entity';
import { Upload } from '../../uploads/entities/upload.entity';

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

  @Column({ default: 0 })
  inventory: number;

  @Column({ nullable: true })
  price: number | null;

  @Column({ nullable: true })
  deadline: Date | null;
}
