import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { AuthStrategy } from '../types/auth-strategy';
import { JwtAudience } from '../types/jwt-audience';

@Injectable()
export class JwtStrategy extends AuthStrategy(Strategy, 'jwt', 'POST') {
  constructor(
    configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.secret'),
      audience: JwtAudience.auth,
    });
  }

  async validate(payload: any) {
    return this.usersService.findOne({ id: payload.sub });
  }
}
