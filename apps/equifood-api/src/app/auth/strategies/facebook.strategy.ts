import { Profile, Strategy } from 'passport-facebook';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { AuthStrategy } from '../types/auth-strategy';
import { User } from '../../users/entities/user.entity';
import authConfig from '../../config/auth.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends AuthStrategy(
  Strategy,
  'facebook',
  'GET'
) {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>
  ) {
    const hostname = 'http://localhost:3333';
    super({
      clientID: config.facebookClientId,
      callbackURL: `${hostname}/api/auth/facebook/`,
      clientSecret: config.facebookSecret,
      enableProof: true,
      scope: ['public_profile', 'email'],
      profileFields: ['id', 'first_name', 'last_name', 'emails'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: (error: any, user?: any, info?: any) => void
  ) {
    try {
      req.socialJwt = await this.authService.generateSocialJWT(
        'facebook',
        profile,
        accessToken,
        refreshToken
      );
      cb(null, {});
    } catch (e) {
      cb(e, null);
    }
  }
}
