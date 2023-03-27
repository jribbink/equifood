/* eslint-disable @typescript-eslint/ban-types */
import { FindOptionsRelations } from 'typeorm';
import { METADATA_REALTIME } from '../constants';
import { EntityMetadataRealtime } from '../interfaces/entity-metadata-realtime';

export function RealtimeEntity<T>(
  authFn: (
    ...args: any[]
  ) => (user: any, entity: any) => Promise<boolean> | boolean,
  relations: FindOptionsRelations<T>,
  dependencies: any
) {
  return (target: Function) => {
    const metadata: EntityMetadataRealtime<T> = {
      authFn,
      dependencies,
      relations,
    };
    Reflect.metadata(METADATA_REALTIME, metadata)(target);
  };
}
