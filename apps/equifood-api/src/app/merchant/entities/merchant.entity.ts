import { Column, Entity } from 'typeorm';
import { UuidEntity } from '../../database/models/uuid-entity';

@Entity()
export class Merchant extends UuidEntity {
  @Column()
  name: string;

  @Column()
  banner_url: string;

  @Column()
  logo_url: string;

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
