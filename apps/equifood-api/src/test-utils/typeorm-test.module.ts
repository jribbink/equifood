import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import entities from '../app/database/entities';

export const TypeOrmSqlLiteTestingModule = (
  feature: EntityClassOrSchema | EntityClassOrSchema[]
) => {
  @Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:',
        dropSchema: true,
        entities: entities,
        synchronize: true,
      }),
      TypeOrmModule.forFeature([].concat(feature)),
    ],
    exports: [TypeOrmModule.forFeature([].concat(feature))],
    providers: [],
  })
  class TypeOrmMariaDbTestingModule {}
  return TypeOrmMariaDbTestingModule;
};
