import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { AuthStrategy } from '../types/auth-strategy';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class GoogleStrategy extends AuthStrategy(Strategy, 'google', 'GET') {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {
    super({
      clientID:
        '1037355133864-sp5hcfog2rtr30rdug7purreq34ghskh.apps.googleusercontent.com',
      callbackURL: 'http://localhost:3333/api/auth/google/',
      clientSecret: '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',
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
