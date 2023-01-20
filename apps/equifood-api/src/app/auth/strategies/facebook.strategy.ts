import {
  Profile,
  Strategy,
  StrategyOptionWithRequest,
} from 'passport-facebook';
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
    config: ConfigType<typeof authConfig>
  ) {
    const options: StrategyOptionWithRequest & { proxy: boolean } = {
      clientID: config.facebookClientId,
      callbackURL: `/api/auth/facebook/`,
      clientSecret: config.facebookSecret,
      enableProof: true,
      profileFields: ['id', 'first_name', 'last_name', 'emails'],
      passReqToCallback: true,
      proxy: true,
    };
    super(options);
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
