import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { AuthProviderType } from '@equifood/api-interfaces';
import { User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class AuthProvider {
  @Field((type) => User)
  @ManyToOne('User', (user: User) => user.authProviders)
  user: User;

  @Exclude()
  @Column({ nullable: true })
  accessToken?: string;

  @Exclude()
  @Column({ nullable: true })
  refreshToken?: string;

  @Field()
  @PrimaryColumn()
  providerId: string;

  @Field((type) => String)
  @PrimaryColumn({ type: 'text' })
  providerType: AuthProviderType;

  @Field()
  @Column()
  accountEmail: string;
}
