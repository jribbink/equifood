import { Exclude } from 'class-transformer';
import { Entity, Column, OneToMany } from 'typeorm';
import type { AuthProvider } from '../../auth/entities/auth-provider';
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

  @Column({ nullable: true })
  @Exclude()
  passwordHash?: string;

  @Column({ nullable: true })
  @Exclude()
  passwordSalt?: string;

  @Column({ type: 'simple-array' })
  roles: Role[];

  @OneToMany('AuthProvider', (provider: AuthProvider) => provider.user)
  authProviders: AuthProvider;

  constructor(data: Partial<User>) {
    super(data?.id);
    Object.assign(this, data);
  }
}
