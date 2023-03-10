import { DynamicModule, Global, Module } from '@nestjs/common';
import { SubscriptionGateway } from './subscription.gateway';
import { SubscriptionService } from './subscription.service';
import { SubscriptionsModuleConfig } from './interfaces/subscriptions-module-config';
import { SUBSCRIPTIONS_MODULE_OPTIONS } from './constants';

@Global()
@Module({
  controllers: [],
  imports: [],
  providers: [SubscriptionGateway, SubscriptionService],
})
export class SubscriptionsCoreModule {
  static forRoot(options: SubscriptionsModuleConfig): DynamicModule {
    const providers = [
      {
        provide: SUBSCRIPTIONS_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject,
      },
    ];
    return {
      imports: options.imports,
      module: SubscriptionsCoreModule,
      providers: providers,
    };
  }
}
