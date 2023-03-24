import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import authConfig from './auth.config';
import uploadsConfig from './uploads.config';
import runtimeConfig from './runtime.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, uploadsConfig, runtimeConfig],
      envFilePath: ['.env'],
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
