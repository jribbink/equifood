import { SetMetadata } from '@nestjs/common';
import { FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { SUBSCRIPTIONS_HANDLER_METADATA } from '../constants';
import { RealtimeRouteOpts } from '../interfaces/realtime-route-opts';

export function RealtimeRoute<Entity extends ObjectLiteral>(
  entity: any,
  resolveFindOptions: (user: any, resp: any) => FindOptionsWhere<Entity>,
  opts?: RealtimeRouteOpts
) {
  return (target: object, propertyKey: string | symbol, descriptor: any) => {
    if (!opts) opts = {} as RealtimeRouteOpts;
    if (!opts.isArray) opts.isArray = false;
    SetMetadata(SUBSCRIPTIONS_HANDLER_METADATA, {
      entity,
      opts,
      resolveFindOptions,
    })(target, propertyKey, descriptor);
  };
}
