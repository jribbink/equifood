import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { AuthStrategy } from '../types/auth-strategy';
import { JwtAudience } from '../types/jwt-audience';
import { AuthService } from '../auth.service';
import { SocialJwtPayload } from '../types/social-jwt-payload';

@Injectable()
export class SocialJwtStrategy extends AuthStrategy(
  Strategy,
  'social-jwt',
  'POST'
) {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.secret'),
      audience: JwtAudience.social,
    });
  }

  async validate(payload: SocialJwtPayload) {
    return this.authService.loginOrCreateSocial(payload);
  }
}
