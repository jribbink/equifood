import { FindManyOptions } from 'typeorm';

export interface SubscriptionsMetadata {
  entity: string;
  findOptions: FindManyOptions;
  isArray: boolean;
  key: string;
  userId: string | number;
}
