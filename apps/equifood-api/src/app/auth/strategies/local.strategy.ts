import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthStrategy } from '../types/auth-strategy';

@Injectable()
export class LocalStrategy extends AuthStrategy(Strategy, 'local', 'POST') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ email }, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
