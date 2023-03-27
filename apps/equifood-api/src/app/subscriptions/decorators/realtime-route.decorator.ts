import { SetMetadata } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { SUBSCRIPTIONS_HANDLER_METADATA } from '../constants';
import { RealtimeRouteOpts } from '../interfaces/realtime-route-opts';

export const RealtimeRoute =
  (
    entity: any,
    resolveFindOptions: (user: any, resp: any) => FindManyOptions<any>,
    opts?: RealtimeRouteOpts
  ) =>
  (target: object, propertyKey: string | symbol, descriptor: any) => {
    if (!opts) opts = {} as RealtimeRouteOpts;
    if (!opts.isArray) opts.isArray = false;
    SetMetadata(SUBSCRIPTIONS_HANDLER_METADATA, {
      entity,
      opts,
      resolveFindOptions,
    })(target, propertyKey, descriptor);
  };
