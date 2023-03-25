import { SetMetadata } from '@nestjs/common';
import { SUBSCRIPTIONS_HANDLER_METADATA } from '../constants';
import { RealtimeRouteOpts } from '../interfaces/realtime-route-opts';

export const RealtimeRoute =
  (entity: any, opts?: RealtimeRouteOpts) =>
  (target: object, propertyKey: string | symbol, descriptor: any) => {
    if (!opts) opts = {} as RealtimeRouteOpts;
    if (!opts.isArray) opts.isArray = false;
    SetMetadata(SUBSCRIPTIONS_HANDLER_METADATA, { entity, opts })(
      target,
      propertyKey,
      descriptor
    );
  };
