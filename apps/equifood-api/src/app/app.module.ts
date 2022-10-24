import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, AppConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
