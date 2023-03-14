import {
  EntityMetadata,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import type { SubscriptionService } from './subscription.service';

export class EntitySubscriber implements EntitySubscriberInterface {
  private pk_list: string[];

  constructor(
    readonly subscriptionService: SubscriptionService,
    readonly metadata: EntityMetadata,
    readonly authFn: (user: any, entity: any) => boolean
  ) {
    console.log('HELLO World');
    this.pk_list = metadata.primaryColumns?.map((pk) => pk.propertyName) ?? [];
  }

  listenTo() {
    return this.metadata.target;
  }

  afterInsert(event: InsertEvent<any>) {
    //TODO: Implement your logic here
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
