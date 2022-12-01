import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { AuthProviderType } from '@equifood/api-interfaces';
import { User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class AuthProvider {
  @ManyToOne(() => User, (user) => user.authProviders)
  user: User;

  @Exclude()
  @Column({ nullable: true })
  accessToken?: string;

  @Exclude()
  @Column({ nullable: true })
  refreshToken?: string;

  @PrimaryColumn()
  providerId: string;

  @PrimaryColumn({ type: 'text' })
  providerType: AuthProviderType;

  @Column()
  accountEmail: string;
}
