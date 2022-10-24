import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { FindOptionsWhere } from 'typeorm';
import { hashPassword } from '../utils/crypto';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    fields: FindOptionsWhere<User>,
    password: string,
  ): Promise<User> {
    const user = await this.userService.findOne(fields);
    if (!user) return null;

    const hash = hashPassword(password, user.passwordSalt);

    if (hash === user.passwordHash) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
    };

    const jwt = this.jwtService.sign(payload);
    const decodedJwt = this.jwtService.decode(jwt) as { [key: string]: string };

    return {
      access_token: jwt,
      expires: decodedJwt.expiresIn
        ? decodedJwt.iat + ms(decodedJwt.expiresIn)
        : null,
    };
  }
}
