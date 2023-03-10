/* eslint-disable @typescript-eslint/ban-types */
import { METADATA_REALTIME } from '../constants';

export const RealtimeEntity =
  (opts = {}) =>
  (target: Function) => {
    Reflect.metadata(METADATA_REALTIME, true)(target);
  };
