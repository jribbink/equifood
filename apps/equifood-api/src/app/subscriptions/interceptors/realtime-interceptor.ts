import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { randomUUID } from 'crypto';
import { map, Observable } from 'rxjs';
import {
  SUBSCRIPTIONS_HANDLER_METADATA,
  SUBSCRIPTIONS_MODULE_OPTIONS,
} from '../constants';
import { SubscribableRouteMetadata } from '../interfaces/subscribable-route-metadata';
import { SubscriptionsMetadata } from '../interfaces/subscriptions-metadata';
import { SubscriptionsModuleOptions } from '../interfaces/subscriptions-module-options';
import { SubscriptionService } from '../subscription.service';

@Injectable()
export class RealtimeInterceptor implements NestInterceptor {
  constructor(
    @Inject(SUBSCRIPTIONS_MODULE_OPTIONS)
    private subscriptionsOptions: SubscriptionsModuleOptions,
    private reflector: Reflector,
    private subscriptionService: SubscriptionService
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const responseMetadata: SubscribableRouteMetadata =
      this.reflector.get<SubscribableRouteMetadata>(
        SUBSCRIPTIONS_HANDLER_METADATA,
        context.getHandler()
      ) ?? ({} as SubscribableRouteMetadata);

    return next.handle().pipe(
      map(async (x) => {
        let subscriptionsMetadata: SubscriptionsMetadata = null;
        if (responseMetadata?.entity) {
          const entity = this.subscriptionService.entityNameMap.get(
            responseMetadata.entity.prototype.constructor
          );
          const user = this.subscriptionsOptions.getContextUser(context);
          subscriptionsMetadata = {
            entity,
            where: responseMetadata.resolveFindOptions(user, x),
            isArray: responseMetadata?.opts?.isArray ?? false,
            key: randomUUID(),
            userId: user ? this.subscriptionsOptions.resolveUserId(user) : null,
          };

          // add subscription token as jwt
          const jwt = await this.subscriptionService.createToken(
            subscriptionsMetadata
          );
          context
            .switchToHttp()
            .getResponse()
            .header('x-subscription-token', jwt);
        }
        return x;
      })
    );
  }
}
