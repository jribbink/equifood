import { DynamicModule, Module } from '@nestjs/common';
import { SubscriptionGateway } from './subscription.gateway';
import { SubscriptionService } from './subscription.service';
import { SubscriptionsModuleConfig } from './interfaces/subscriptions-module-config';

export const SUBSCRIPTIONS_MODULE_OPTIONS = 'SUBSCRIPTIONS_MODULE_OPTIONS';

@Module({
  controllers: [],
  imports: [],
  providers: [SubscriptionGateway, SubscriptionService],
})
export class SubscriptionsModule {
  static register(options: SubscriptionsModuleConfig): DynamicModule {
    const providers = [
      {
        provide: SUBSCRIPTIONS_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject,
      },
    ];
    return {
      imports: options.imports,
      module: SubscriptionsModule,
      providers: providers,
    };
  }
}
