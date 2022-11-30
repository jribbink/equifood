import { Profile, Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { AuthStrategy } from '../types/auth-strategy';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class FacebookStrategy extends AuthStrategy(
  Strategy,
  'facebook',
  'GET'
) {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {
    super({
      clientID: '445686011071519',
      callbackURL: 'http://localhost:3333/api/auth/facebook/',
      clientSecret: 'a27ae2bc1c8aab2b4d4282ac1add894d',
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
