import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthProvider } from './entities/auth-provider';
import { AppleStrategy } from './strategies/apple.strategy';
import { AuthStrategy } from './types/auth-strategy';
import { SocialJwtStrategy } from './strategies/social-jwt.strategy';
import { WebsocketValidator } from './websocket-validator';

const strategies: any[] = [
  LocalStrategy,
  JwtStrategy,
  GoogleStrategy,
  FacebookStrategy,
  AppleStrategy,
  SocialJwtStrategy,
];

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('auth.secret'),
      }),
    }),
    TypeOrmModule.forFeature([AuthProvider]),
  ],
  exports: [AuthService, WebsocketValidator],
  providers: [...strategies, AuthService, WebsocketValidator],
  controllers: [AuthController],
})
export class AuthModule {}
