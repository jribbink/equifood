import { NestFactory } from '@nestjs/core';
import { DbSeedModule } from '../app/database/seed/db-seed.module';
import { Seeder } from '../app/database/seed/seeder';

export async function seedDatabase() {
  const seedContext = await NestFactory.create(DbSeedModule);
  await seedContext.get(Seeder).seed();
  seedContext.close();
}
