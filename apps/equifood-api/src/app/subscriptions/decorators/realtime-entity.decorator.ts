/* eslint-disable @typescript-eslint/ban-types */
import { METADATA_REALTIME } from '../constants';
import { EntityMetadataRealtime } from '../interfaces/entity-metadata-realtime';

export const RealtimeEntity =
  (
    authFn: (
      ...args: any[]
    ) => (user: any, entity: any) => Promise<boolean> | boolean,
    relations: { [property: string]: boolean },
    dependencies: any
  ) =>
  (target: Function) => {
    const metadata: EntityMetadataRealtime = {
      authFn,
      dependencies,
      relations,
    };
    Reflect.metadata(METADATA_REALTIME, metadata)(target);
  };
