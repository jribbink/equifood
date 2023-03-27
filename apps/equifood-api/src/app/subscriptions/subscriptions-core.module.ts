import { DynamicModule, Global, Module } from '@nestjs/common';
import { SubscriptionGateway } from './subscription.gateway';
import { SubscriptionService } from './subscription.service';
import { SubscriptionsModuleConfig } from './interfaces/subscriptions-module-config';
import { METADATA_REALTIME, SUBSCRIPTIONS_MODULE_OPTIONS } from './constants';
import entities from '../database/entities';
import _ from 'lodash';
import { JwtModule } from '@nestjs/jwt';
import { SubscriptionsModuleOptions } from './interfaces/subscriptions-module-options';
import { SubscriptionsConfigModule } from './subscriptions-config.module';
import { SubscriptionsConfigService } from './subscriptions-config.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RealtimeInterceptor } from './interceptors/realtime-interceptor';
@Global()
@Module({
  controllers: [],
  imports: [],
  providers: [],
})
export class SubscriptionsCoreModule {
  static forRoot(options: SubscriptionsModuleConfig): DynamicModule {
    const providers = [SubscriptionGateway, SubscriptionService];

    const imports = [
      SubscriptionsConfigModule.forRoot(options),
      JwtModule.registerAsync({
        imports: [SubscriptionsConfigModule.forRoot(options)],
        inject: [SubscriptionsConfigService],
        useFactory: (
          subscriptionsConfigService: SubscriptionsConfigService
        ) => ({
          secret: subscriptionsConfigService.config.jwtSecret,
        }),
      }),
      ...options.imports,
    ];

    const exports = [SubscriptionService];

    // Resolve dependencies for realtime authorization check
    const realtimeDependencies = entities.reduce((acc, entity) => {
      return _.merge(acc, this.getRealtimeDependencies(entity));
    }, {});

    return _.merge(
      {
        imports,
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
