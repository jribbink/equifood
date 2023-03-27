import { FindOptionsRelations } from 'typeorm';

export interface EntityMetadataRealtime<T = any> {
  authFn: (
    ...args: any[]
  ) => (user: any, entity: any) => Promise<boolean> | boolean;
  relations: FindOptionsRelations<T>;
  dependencies: any;
}
