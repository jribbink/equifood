import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Upload extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  mime_type: string;

  @Column()
  size: number;

  @Exclude()
  @Column()
  path: string;
}
