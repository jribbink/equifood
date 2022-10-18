import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import authConfig from './auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
      envFilePath: ['.env'],
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
