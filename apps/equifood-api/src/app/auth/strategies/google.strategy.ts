import {
  Profile,
  Strategy,
  StrategyOptions,
  StrategyOptionsWithRequest,
  VerifyCallback,
} from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { AuthStrategy } from '../types/auth-strategy';
import authConfig from '../../config/auth.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends AuthStrategy(Strategy, 'google', 'GET') {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    @Inject(authConfig.KEY)
    config: ConfigType<typeof authConfig>
  ) {
    const options: StrategyOptionsWithRequest & { proxy: boolean } = {
      clientID: config.googleClientId,
      callbackURL: `/api/auth/google/`,
      clientSecret: config.googleSecret,
      scope: ['email', 'openid', 'profile'],
      passReqToCallback: true as any,
      proxy: true,
    };
    super(options);
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: VerifyCallback
  ) {
    try {
      req.socialJwt = await this.authService.generateSocialJWT(
        'google',
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
