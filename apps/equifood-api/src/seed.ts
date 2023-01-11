import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { rmSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import { AppConfigModule } from './app/config/app-config.module';
import { MOCK_DB_PATH } from './app/database/typeorm-config.service';
import { seedDatabase } from './utils/seed-database';

async function bootstrap() {
  // Seed database if configured
  const configContext = await NestFactory.create(AppConfigModule);
  const isMockDb = configContext.get(ConfigService).get('database.mock');
  configContext.close();
  if (isMockDb) {
    rmSync(path.join(cwd(), MOCK_DB_PATH), { force: true });
    await seedDatabase();
  }
}

bootstrap();
