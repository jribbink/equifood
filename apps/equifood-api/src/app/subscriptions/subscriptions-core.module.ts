import { DynamicModule, Global, Module } from '@nestjs/common';
import { SubscriptionGateway } from './subscription.gateway';
import { SubscriptionService } from './subscription.service';
import { SubscriptionsModuleConfig } from './interfaces/subscriptions-module-config';
import { METADATA_REALTIME, SUBSCRIPTIONS_MODULE_OPTIONS } from './constants';
import entities from '../database/entities';
import _ from 'lodash';
@Global()
@Module({
  controllers: [],
  imports: [],
  providers: [],
})
export class SubscriptionsCoreModule {
  static forRoot(options: SubscriptionsModuleConfig): DynamicModule {
    const providers = [
      {
        provide: SUBSCRIPTIONS_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject,
      },
      SubscriptionGateway,
      SubscriptionService,
    ];

    const exports = [SubscriptionService];

    // Resolve dependencies for realtime authorization check
    const realtimeDependencies = entities.reduce((acc, entity) => {
      return _.merge(acc, this.getRealtimeDependencies(entity));
    }, {});

    console.log(
      _.merge(
        {
          imports: options.imports,
          module: SubscriptionsCoreModule,
          providers,
          exports,
        },
        realtimeDependencies
      )
    );

    return _.merge(
      {
        imports: options.imports,
        module: SubscriptionsCoreModule,
        providers,
        exports,
      },
      realtimeDependencies
    );
  }

  private static getRealtimeDependencies(entity: any) {
    const realtimeMetadata = Reflect.getMetadata(METADATA_REALTIME, entity);
    return realtimeMetadata?.dependencies || {};
  }
}
