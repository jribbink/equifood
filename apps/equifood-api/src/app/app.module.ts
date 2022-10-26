import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MerchantsModule } from './merchant/merchants.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AppConfigModule,
    DatabaseModule,
    MerchantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
