import { FindManyOptions } from 'typeorm';
import { RealtimeRouteOpts } from './realtime-route-opts';

export interface SubscribableRouteMetadata {
  // eslint-disable-next-line @typescript-eslint/ban-types
  entity: Function;
  opts: RealtimeRouteOpts;
  resolveFindOptions: (user: any, resp: any) => FindManyOptions<any>;
}
