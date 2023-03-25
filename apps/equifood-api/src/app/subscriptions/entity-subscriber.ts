import {
  EntityMetadata,
  EntitySubscriberInterface,
  FindOptionsWhere,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
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
    readonly authFn: (user: any, entity: any) => boolean
  ) {
    this.trie = new ColumnTrie(metadata.columns.map((x) => x.propertyName));
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
      this.subscriptionService.dispatch(
        this.listeners.get(listenerKey),
        'HELLO WORLD'
      );
    });
  }

  afterRemove(event: RemoveEvent<any>): void | Promise<any> {
    console.log('removed');
  }

  afterUpdate(event: UpdateEvent<any>): void | Promise<any> {
    const targetListeners = this.trie.lookup(event.entity);
    console.log(targetListeners);
    targetListeners.forEach((listenerKey) => {
      this.subscriptionService.dispatch(
        this.listeners.get(listenerKey),
        'HELLO WORLD'
      );
    });
  }
}
