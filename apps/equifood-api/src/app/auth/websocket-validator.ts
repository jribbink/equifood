import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class WebsocketValidator {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  async validate(token: string) {
    const payload = await this.authService.verifyJwt(token);
    return this.usersService.findOne({ id: payload.sub });
  }
}
