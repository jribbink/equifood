import { Module } from '@nestjs/common';
import { AdminModule as AdminJsModule } from '@adminjs/nestjs';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AdminJsModule.createAdminAsync({
      useFactory: (authService: AuthService, configService: ConfigService) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [],
        },
        auth: {
          authenticate: async (email: string, password: string) => {
            const user = await authService.validateUser({ email }, password);
            if (user && user.roles.includes('admin')) {
              return user;
            } else {
              return null;
            }
          },
          cookieName: 'adminjs',
          cookiePassword: configService.getOrThrow('auth.secret'),
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: configService.getOrThrow('auth.secret'),
        },
      }),
      imports: [AuthModule, ConfigModule],
      inject: [AuthService, ConfigService],
    }),
  ],
})
export class AdminModule {}
