import { ModuleMetadata } from '@nestjs/common';
import { SubscriptionsModuleOptions } from './subscriptions-module-options';

export interface SubscriptionsModuleConfig
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<SubscriptionsModuleOptions> | SubscriptionsModuleOptions;
  inject?: any[];
  imports: any;
}
