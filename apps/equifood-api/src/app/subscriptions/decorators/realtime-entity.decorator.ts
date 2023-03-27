/* eslint-disable @typescript-eslint/ban-types */
import { FindOptionsRelations } from 'typeorm';
import { METADATA_REALTIME } from '../constants';
import { EntityMetadataRealtime } from '../interfaces/entity-metadata-realtime';

export function RealtimeEntity<T>(
  relations: FindOptionsRelations<T>,
  dependencies: any
) {
  return (target: Function) => {
    const metadata: EntityMetadataRealtime<T> = {
      dependencies,
      relations,
    };
    Reflect.metadata(METADATA_REALTIME, metadata)(target);
  };
}
