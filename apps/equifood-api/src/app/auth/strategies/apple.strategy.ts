import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import passport from 'passport';
import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { AuthStrategy } from '../types/auth-strategy';
import { User } from '../../users/entities/user.entity';

type Profile = passport.Profile;

interface IAppleStrategy {
  validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: (error: any, user?: any) => void
  ): any;
}

interface AppleStrategyOptions {
  audience: string;
}

class Strategy extends passport.Strategy {
  name?: string = 'apple';
  audience?: string;

  constructor({ audience }: AppleStrategyOptions) {
    super();
    this.audience = audience;
  }

  async authenticate(
    this: passport.StrategyCreated<
      this,
      this & passport.StrategyCreatedStatic & IAppleStrategy
    >,
    _req: any,
    _options?: any
  ) {
    const { identityToken, fullName } = _req.body;

    const client = jwksClient({
      jwksUri: 'https://appleid.apple.com/auth/keys',
    });
    function getKey(header, callback) {
      client.getSigningKey(header.kid, function (err, key) {
        callback(null, key.getPublicKey());
      });
    }

    const { sub, email }: jwt.JwtPayload = await new Promise(
      (resolve, reject) => {
        jwt.verify(
          identityToken,
          getKey,
          { audience: this.audience },
          function (err, decoded) {
            if (err) reject(decoded);
            else resolve(decoded as jwt.JwtPayload);
          }
        );
      }
    );

    const callback = (error: any, user?: any) => {
      if (error) {
        this.error(error);
      } else {
        this.success(user);
      }
    };

    this.validate(
      _req,
      null,
      null,
      {
        provider: this.name,
        id: sub,
        displayName: email,
        emails: [{ value: email }],
        name: {
          familyName: fullName.familyName,
          givenName: fullName.givenName,
          middleName: fullName.middleName,
        },
      },
      callback
    );
  }
}

@Injectable()
export class AppleStrategy extends AuthStrategy(Strategy, 'apple', 'POST') {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {
    super({
      audience: 'host.exp.Exponent',
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: (error: any, user?: any) => void
  ) {
    try {
      req.socialJwt = await this.authService.generateSocialJWT(
        'apple',
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
