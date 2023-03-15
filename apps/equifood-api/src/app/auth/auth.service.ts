import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { hashPassword } from '../common/utils/crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthProvider } from './entities/auth-provider';
import ms from 'ms';
import { AuthProviderType } from '@equifood/api-interfaces';
import passport from 'passport';
import { ConfigService } from '@nestjs/config';
import { SocialJwtPayload } from './types/social-jwt-payload';
import { JwtAudience } from './types/jwt-audience';
import { CreateUserDto } from '../users/models/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(AuthProvider)
    private authProviderService: Repository<AuthProvider>
  ) {}

  async validateUser(
    fields: FindOptionsWhere<User>,
    password: string
  ): Promise<User> {
    const user = await this.userService.findOne(fields);
    if (!user) return null;

    const hash = hashPassword(password, user.passwordSalt);

    if (hash === user.passwordHash) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
    };

    const jwt = this.jwtService.sign(payload, { audience: JwtAudience.auth });

    return jwt;
  }

  async createProvider(provider: AuthProvider) {
    if (
      await this.authProviderService.findOneBy({
        providerId: provider.providerId,
        providerType: provider.providerType,
      })
    )
      throw new BadRequestException(
        'An existing account already exists with this social login.'
      );

    return this.authProviderService.save(provider);
  }

  async loginOrCreateSocial(socialJwtPayload: SocialJwtPayload) {
    const { profile, providerType, accessToken, refreshToken } =
      socialJwtPayload;

    let user = await this.userService.findOne({
      authProviders: { providerId: profile.id, providerType },
    });
    if (!user) {
      user = await this.userService.createUser(<CreateUserDto>{
        email: profile.emails[0].value,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        phone: 'unknown',
        roles: ['customer'],
      });

      await this.linkSocial(user, socialJwtPayload);
    }

    return user;
  }

  async linkSocial(user: User, socialJwtPayload: SocialJwtPayload) {
    const { profile, providerType, refreshToken, accessToken } =
      socialJwtPayload;

    await this.createProvider({
      providerId: profile.id,
      providerType,
      user,
      accountEmail: profile.emails[0].value,
      refreshToken,
      accessToken,
    });
  }

  async generateSocialJWT(
    provider: AuthProviderType,
    profile: passport.Profile,
    accessToken?: string,
    refreshToken?: string
  ) {
    const payload: SocialJwtPayload = {
      providerType: provider,
      profile: profile,
      refreshToken,
      accessToken,
    };

    const providerToken = this.jwtService.sign(payload, {
      expiresIn: 60,
      audience: JwtAudience.social,
    });
    return providerToken;
  }

  async validateSocialJwt(socialJwt: string) {
    const socialJwtPayload: SocialJwtPayload =
      await this.jwtService.verifyAsync(socialJwt, {
        audience: JwtAudience.social,
      });

    return socialJwtPayload;
  }
}
