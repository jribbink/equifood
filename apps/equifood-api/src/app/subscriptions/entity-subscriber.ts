import { RealtimeUpdateMessage } from '@equifood/api-interfaces';
import {
  EntityMetadata,
  EntitySubscriberInterface,
  FindOptionsRelations,
  FindOptionsWhere,
  InsertEvent,
  ObjectLiteral,
  RemoveEvent,
  Repository,
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
    readonly realtimeMetadata: EntityMetadataRealtime,
    readonly repository: Repository<any>
  ) {
    const resolveRelations = (
      relations: FindOptionsRelations<any>,
      metadata: EntityMetadata
    ) => {
      this.pk_list = metadata.columns
        .filter((x) => x.isPrimary)
        .map((x) => x.propertyName);

      const relationsMap = new Map<string, RelationMetadata>();
      metadata.relations.forEach((x) => {
        relationsMap.set(x.propertyName, x);
      });

      const relationColumns = Object.entries(relations).reduce((a, [k, v]) => {
        if (typeof v === 'object') {
          a.push(
            ...resolveRelations(v, relationsMap.get(k).entityMetadata).map(
              (path) => [k, ...path]
            )
          );
        } else if (v === true) {
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

      const entityColumns = metadata.columns
        .map((x) => [x.propertyName])
        .filter((x) => !relationsMap.has(x[0]));

      return [...entityColumns, ...relationColumns];
    };

    this.trie = new ColumnTrie(
      resolveRelations(this.realtimeMetadata.relations, metadata)
    );
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

  async afterInsert(event: InsertEvent<any>) {
    await this.processEvent(event.entity);
  }

  afterRemove(event: RemoveEvent<any>): void | Promise<any> {
    console.log('removed');
  }

  async afterUpdate(event: UpdateEvent<any>): Promise<any> {
    await this.processEvent(event.entity);
  }

  private async processEvent(eventEntity: ObjectLiteral) {
    const entities = await this.repository.find({
      where: this.pk_list.reduce((a, pk) => {
        a[pk] = eventEntity[pk];
        return a;
      }, {}),
      relations: this.realtimeMetadata.relations,
    });
    const targetListeners = new Set<string>();

    entities.forEach((entity) => {
      this.trie.lookup(entity).forEach((x) => {
        targetListeners.add(x);
      });
    });

    targetListeners.forEach((listenerKey) => {
      const data: RealtimeUpdateMessage = {
        key: listenerKey,
      };

      this.subscriptionService.dispatch(
        this.listeners.get(listenerKey),
        JSON.stringify(data)
      );
    });
  }
}
