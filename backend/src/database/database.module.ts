import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from "typeorm"
import { TypeOrmConfigService } from './typeorm-config.service';
import { DatabaseBackupService } from './database-backup.service';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options)
        return dataSource
      }
    }),
    NestScheduleModule.forRoot()
  ],
  providers: [DatabaseBackupService],
})
export class DatabaseModule {}
