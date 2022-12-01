import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
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
    private config: ConfigType<typeof authConfig>
  ) {
    const hostname = 'http://localhost:3333';
    super({
      clientID: config.googleClientId,
      callbackURL: `${hostname}/api/auth/google/`,
      clientSecret: config.googleSecret,
      scope: ['email', 'openid', 'profile'],
      enableProof: true,
      passReqToCallback: true,
    });
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
