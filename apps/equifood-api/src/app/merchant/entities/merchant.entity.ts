import { Column, Entity } from 'typeorm';
import { UuidEntity } from '../../database/models/uuid-entity';

@Entity()
export class Merchant extends UuidEntity {
  @Column()
  name: string;

  @Column()
  banner_url: string;
}
