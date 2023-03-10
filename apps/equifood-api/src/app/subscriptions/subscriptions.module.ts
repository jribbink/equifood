import { DynamicModule, Module } from '@nestjs/common';
import { SubscriptionsModuleConfig } from './interfaces/subscriptions-module-config';
import { SubscriptionsCoreModule } from './subscriptions-core.module';

@Module({
  controllers: [],
  imports: [],
})
export class SubscriptionsModule {
  static forRoot(options: SubscriptionsModuleConfig): DynamicModule {
    return {
      imports: [SubscriptionsCoreModule.forRoot(options)],
      module: SubscriptionsModule,
    };
  }
}
