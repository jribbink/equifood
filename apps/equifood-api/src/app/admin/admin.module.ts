import { Module } from '@nestjs/common';
import { AdminModule as AdminJsModule } from '@adminjs/nestjs';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import entities from '../database/entities';

import * as AdminJSTypeorm from '@adminjs/typeorm';
import AdminJS from 'adminjs';
import { User } from '../users/entities/user.entity';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from '../uploads/entities/upload.entity';
import { Merchant } from '../merchant/entities/merchant.entity';
import { Item } from '../merchant/entities/item.entity';

AdminJS.registerAdapter({
  Database: AdminJSTypeorm.Database,
  Resource: AdminJSTypeorm.Resource,
});

@Module({
  imports: [
    AdminJsModule.createAdminAsync({
      useFactory: (authService: AuthService, configService: ConfigService) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [User, Merchant, Item, Upload],
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
      imports: [
        AuthModule,
        ConfigModule,
        DatabaseModule,
        TypeOrmModule.forFeature(entities),
      ],
      inject: [AuthService, ConfigService],
    }),
  ],
})
export class AdminModule {}
