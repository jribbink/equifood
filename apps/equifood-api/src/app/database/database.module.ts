import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DataSourceService } from './data-source.service';
import { TypeOrmConfigService } from './typeorm-config.service';

const TypeORM = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options) => {
    const dataSource = await new DataSource(options);
    return dataSource;
  },
});
@Module({
  imports: [TypeORM],
  exports: [TypeORM, DataSourceService],
  providers: [DataSourceService],
})
export class DatabaseModule {}
