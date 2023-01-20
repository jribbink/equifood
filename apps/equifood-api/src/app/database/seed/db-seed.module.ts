import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../../config/app-config.module';
import { DatabaseModule } from '../database.module';
import { Seeder } from './seeder';
import entities from '../entities';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature(entities),
  ],
  providers: [Seeder],
})
export class DbSeedModule {}
