import { DynamicModule, Global, Module } from '@nestjs/common';
import { SubscriptionsModuleConfig } from './interfaces/subscriptions-module-config';
import { SUBSCRIPTIONS_MODULE_OPTIONS } from './constants';
import { SubscriptionsConfigService } from './subscriptions-config.service';

@Global()
@Module({
  controllers: [],
  imports: [],
  providers: [],
})
export class SubscriptionsConfigModule {
  static forRoot(options: SubscriptionsModuleConfig): DynamicModule {
    const providers = [
      {
        provide: SUBSCRIPTIONS_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject,
      },
      SubscriptionsConfigService,
    ];

    const exports = [...providers];

    return {
      imports: options.imports,
      module: SubscriptionsConfigModule,
      providers,
      exports,
    };
  }
}
