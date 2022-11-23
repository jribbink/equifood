import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { UuidEntity } from '../../database/models/uuid-entity';

@Entity()
export class Upload extends UuidEntity {
  @Column({ nullable: true })
  name: string;

  @Column()
  filename: string;

  @Column()
  ext: string;

  @Column({
    type: 'integer',
    transformer: {
      from: (value) => (value ? new Date(value) : null),
      to: (value: Date) => (value ? value.getTime() : new Date().getTime()),
    },
    default: () => new Date().getTime(),
  })
  upload_date: Date;

  @Column()
  mine_type: string;

  @Column()
  size: number;

  @Exclude()
  @Column()
  path: string;
}
