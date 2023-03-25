import { RealtimeRouteOpts } from './realtime-route-opts';

export interface SubscribableRouteMetadata {
  // eslint-disable-next-line @typescript-eslint/ban-types
  entity: Function;
  opts: RealtimeRouteOpts;
}
