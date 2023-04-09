import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthProvider } from '../../auth/entities/auth-provider';
import { Role } from '../../common/types/role.enum';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  phone: string;

  @Column({ nullable: true })
  @Exclude()
  passwordHash?: string;

  @Column({ nullable: true })
  @Exclude()
  passwordSalt?: string;

  @Field((type) => [String])
  @Column({ type: 'simple-array' })
  roles: Role[];

  @Field((type) => AuthProvider)
  @OneToMany('AuthProvider', (provider: AuthProvider) => provider.user)
  authProviders: AuthProvider;
}
