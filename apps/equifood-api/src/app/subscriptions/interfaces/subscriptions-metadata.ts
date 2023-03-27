import { FindOptionsWhere } from 'typeorm';

export interface SubscriptionsMetadata<T = any> {
  entity: string;
  where: FindOptionsWhere<T>;
  isArray: boolean;
  key: string;
  userId: string | number;
}
