/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppConfigModule } from './app/config/app-config.module';
import { seedDatabase } from './utils/seed-database';

async function bootstrap() {
  // Seed database if configured
  const configContext = await NestFactory.create(AppConfigModule);
  const seedDB = configContext.get(ConfigService).get('database.mock');
  configContext.close();
  if (seedDB) {
    await seedDatabase();
  }

  // Initialize app
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
