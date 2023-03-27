import { FindOptionsRelations } from 'typeorm';

export interface EntityMetadataRealtime<T = any> {
  relations: FindOptionsRelations<T>;
  dependencies: any;
}
