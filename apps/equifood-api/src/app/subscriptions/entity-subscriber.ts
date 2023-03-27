import { RealtimeUpdateMessage } from '@equifood/api-interfaces';
import {
  EntityMetadata,
  EntitySubscriberInterface,
  FindOptionsWhere,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';
import { EntityMetadataRealtime } from './interfaces/entity-metadata-realtime';
import type { SubscriptionService } from './subscription.service';
import { ColumnTrie } from './util/column-trie';

type UserId = string | number;

export class EntitySubscriber implements EntitySubscriberInterface {
  private pk_list: string[];
  private trie: ColumnTrie;
  private listeners: Map<string, UserId> = new Map();
  private listenersRev: Map<UserId, Set<string>> = new Map();

  constructor(
    readonly subscriptionService: SubscriptionService,
    readonly metadata: EntityMetadata,
    readonly realtimeMetadata: EntityMetadataRealtime
  ) {
    const relationsMap = new Map<string, RelationMetadata>();
    metadata.relations.forEach((x) => {
      relationsMap.set(x.propertyName, x);
    });

    const relationColumns = Object.entries(
      this.realtimeMetadata.relations
    ).reduce((a, [k, v]) => {
      if (v) {
        if (!relationsMap.has(k))
          throw new Error('Relation column does not exist');

        const relation = relationsMap.get(k);
        let relationName: string;
        if (typeof relation.type === 'string') {
          relationName = relation.type;
        } else {
          relationName = this.subscriptionService.entityNameMap.get(
            relation.type
          );
        }

        const relationMetadata =
          this.subscriptionService.entityMetadataMap.get(relationName);
        const relationColumns = relationMetadata.columns.map(
          (x) => x.propertyName
        );

        a.push(...relationColumns.map((name) => [k, name]));
      }
      return a;
    }, []);

    const entityColumns = metadata.columns.map((x) => [x.propertyName]);

    this.trie = new ColumnTrie([...entityColumns, ...relationColumns]);
    this.pk_list = metadata.primaryColumns?.map((pk) => pk.propertyName) ?? [];
  }

  addListener(userId: UserId, criteria: FindOptionsWhere<any>, key: string) {
    const userListeners = this.listenersRev.get(userId) ?? new Set();
    userListeners.add(key);
    this.listeners.set(key, userId);
    this.listenersRev.set(userId, userListeners);
    this.trie.insert(criteria, key);

    return true;
  }

  removeListener(userId: UserId, key?: string): string[] {
    const removedKeys: string[] = [];
    if (!key) {
      this.listenersRev.get(userId).forEach((key) => {
        this.listeners.delete(key);
        this.trie.remove(key);
        removedKeys.push(key);
      });
      this.listenersRev.delete(userId);
    } else {
      const userListeners = this.listenersRev.get(userId);
      userListeners.delete(key);
      this.listeners.delete(key);
      this.trie.remove(key);
      removedKeys.push(key);
    }
    return removedKeys;
  }

  listenTo() {
    return this.metadata.target;
  }

  afterInsert(event: InsertEvent<any>) {
    const targetListeners = this.trie.lookup(event.entity);
    targetListeners.forEach((listenerKey) => {
      const data: RealtimeUpdateMessage = {
        type: 'insert',
        data: event.entity,
        key: listenerKey,
      };

      this.subscriptionService.dispatch(
        this.listeners.get(listenerKey),
        JSON.stringify(data)
      );
    });
  }

  afterRemove(event: RemoveEvent<any>): void | Promise<any> {
    console.log('removed');
  }

  async afterUpdate(event: UpdateEvent<any>): Promise<any> {
    const targetListeners = this.trie.lookup(event.entity);
    const changedEntity = Object.assign({}, event.databaseEntity, event.entity); // hacky, but good enough for now

    targetListeners.forEach((listenerKey) => {
      const data: RealtimeUpdateMessage = {
        type: 'update',
        data: changedEntity,
        key: listenerKey,
      };

      this.subscriptionService.dispatch(
        this.listeners.get(listenerKey),
        JSON.stringify(data)
      );
    });
  }
}
