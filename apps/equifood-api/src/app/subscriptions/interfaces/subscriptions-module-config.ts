import { ModuleMetadata } from '@nestjs/common';
import { SubscriptionsModuleOptions } from './subscriptions-module-options';

export interface SubscriptionsModuleConfig<T = any>
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<SubscriptionsModuleOptions<T>> | SubscriptionsModuleOptions<T>;
  inject?: any[];
  imports: any;
}
