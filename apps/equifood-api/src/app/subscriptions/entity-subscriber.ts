import {
  EntityMetadata,
  EntitySubscriberInterface,
  FindOptionsWhere,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import type { SubscriptionService } from './subscription.service';

export class EntitySubscriber implements EntitySubscriberInterface {
  private pk_list: string[];
  private listeners: Map<any, Set<FindOptionsWhere<any>>> = new Map();

  constructor(
    readonly subscriptionService: SubscriptionService,
    readonly metadata: EntityMetadata,
    readonly authFn: (user: any, entity: any) => boolean
  ) {
    this.pk_list = metadata.primaryColumns?.map((pk) => pk.propertyName) ?? [];
  }

  addListener(user: any, criteria: FindOptionsWhere<any>) {
    let addedListener = true;
    const userListeners = this.listeners.get(user) ?? new Set();
    if (!userListeners.has(criteria)) addedListener = true;
    userListeners.add(criteria);
    this.listeners.set(user, userListeners);
    return addedListener;
  }

  removeListener(user: any, criteria?: FindOptionsWhere<any>) {
    if (!criteria) this.listeners.delete(user);
    else {
      const userListeners = this.listeners.get(user) ?? new Set();
      userListeners.delete(criteria);
      this.listeners.set(user, userListeners);
    }
  }

  listenTo() {
    return this.metadata.target;
  }

  afterInsert(event: InsertEvent<any>) {
    const pk_values = this.pk_list.reduce((obj, pk) => {
      return {
        ...obj,
        pk: event.entity['pk'],
      };
    }, {});

    console.log(event, pk_values);
  }

  afterRemove(event: RemoveEvent<any>): void | Promise<any> {
    console.log('removed');
  }

  afterUpdate(event: UpdateEvent<any>): void | Promise<any> {
    const pk_values = this.pk_list.reduce((obj, pk) => {
      return {
        ...obj,
        pk: event.entity['pk'],
      };
    }, {});

    console.log(event, pk_values);
  }
}
