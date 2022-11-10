import { Exclude } from 'class-transformer';
import { Entity, Column } from 'typeorm';
import { Role } from '../../common/types/role.enum';
import { UuidEntity } from '../../database/models/uuid-entity';

@Entity({ name: 'users' })
export class User extends UuidEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  @Exclude()
  passwordHash: string;

  @Column()
  @Exclude()
  passwordSalt: string;

  @Column({ type: 'simple-array' })
  roles: Role[];

  constructor(data: Partial<User>) {
    super(data?.id);
    Object.assign(this, data);
  }
}
