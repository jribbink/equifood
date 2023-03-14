/* eslint-disable @typescript-eslint/ban-types */
import { METADATA_REALTIME } from '../constants';

export const RealtimeEntity =
  (
    authFn: (
      ...args: any[]
    ) => (user: any, entity: any) => Promise<boolean> | boolean,
    dependencies: any
  ) =>
  (target: Function) => {
    const metadata = {
      authFn,
      dependencies,
    };
    Reflect.metadata(METADATA_REALTIME, metadata)(target);
  };
