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
import type { SubscriptionService } from './subscription.service';
import { ColumnTrie } from './util/column-trie';

export class EntitySubscriber implements EntitySubscriberInterface {
  private pk_list: string[];
  private trie: ColumnTrie;
  private listeners: Map<string, string> = new Map();
  private listenersRev: Map<string, Set<string>> = new Map();
  public relationDependencies: [depName: string, path: string[]][] = [];
  private relationDependents: [dependent: EntitySubscriber, path: string[]][] =
    [];

  constructor(
    readonly subscriptionService: SubscriptionService,
    readonly metadata: EntityMetadata,
    readonly relations: FindOptionsRelations<any>,
    readonly repository: Repository<any>
  ) {
    const resolveRelations = (
      relations: FindOptionsRelations<any>,
      metadata: EntityMetadata,
      currentPath: string[]
    ) => {
      this.pk_list = metadata.columns
        .filter((x) => x.isPrimary)
        .map((x) => x.propertyName);

      const relationsMap = new Map<string, RelationMetadata>();
      metadata.relations.forEach((x) => {
        relationsMap.set(x.propertyName, x);
      });

      const relationColumns = Object.entries(relations).reduce((a, [k, v]) => {
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

        // Add dependency
        this.relationDependencies.push([relationName, [...currentPath, k]]);

        if (typeof v === 'object') {
          currentPath.push(k);
          a.push(
            ...resolveRelations(
              v,
              relationsMap.get(k).entityMetadata,
              currentPath
            ).map((path) => [k, ...path])
          );
          currentPath.pop();
        } else if (v === true) {
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

    this.trie = new ColumnTrie(resolveRelations(relations, metadata, []));
    this.pk_list = metadata.primaryColumns?.map((pk) => pk.propertyName) ?? [];
  }

  registerDependent(dependent: EntitySubscriber, path: string[]) {
    this.relationDependents.push([dependent, path]);
  }

  addListener(clientId: string, criteria: FindOptionsWhere<any>, key: string) {
    const clientListeners = this.listenersRev.get(clientId) ?? new Set();
    clientListeners.add(key);
    this.listeners.set(key, clientId);
    this.listenersRev.set(clientId, clientListeners);
    this.trie.insert(criteria, key);
    return true;
  }

  removeListener(clientId: string, key?: string): string[] {
    const removedKeys: string[] = [];
    if (!key) {
      this.listenersRev.get(clientId).forEach((key) => {
        this.listeners.delete(key);
        this.trie.remove(key);
        removedKeys.push(key);
      });
      this.listenersRev.delete(clientId);
    } else {
      const userListeners = this.listenersRev.get(clientId);
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
    this.processEvent(event.entity);
  }

  afterRemove(event: RemoveEvent<any>): void | Promise<any> {
    // TODO: Implement after remove subscriptions
  }

  async afterUpdate(event: UpdateEvent<any>): Promise<any> {
    this.processEvent(event.entity);
  }

  public processDependencyEvent(entity: ObjectLiteral, path: string[]) {
    const obj = {};
    let curr = obj;
    for (const prop of path.slice(undefined, -1)) {
      curr = curr[prop];
    }
    curr[path.at(-1)] = entity;
    this.processEvent(obj);
  }

  private async processEvent(eventEntity: ObjectLiteral) {
    const entities = await this.repository.find({
      where: this.pk_list.reduce((a, pk) => {
        a[pk] = eventEntity[pk];
        return a;
      }, {}),
      relations: this.relations,
    });

    const targetListeners = new Set<string>();

    entities.forEach((entity) => {
      this.relationDependents.forEach(([dependent, path]) => {
        dependent.processDependencyEvent(entity, path);
      });

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
