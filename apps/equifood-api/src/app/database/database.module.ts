import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from './typeorm-config.service';

@Module({})
export class DBModule {
  static async registerAsync(): Promise<DynamicModule> {
    return {
      module: DBModule,
      providers: [TypeOrmConfigService],
    };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        console.log(options);
        const dataSource = await new DataSource(options);
        return dataSource;
      },
    }),
  ],
  providers: [],
})
export class DatabaseModule {}
