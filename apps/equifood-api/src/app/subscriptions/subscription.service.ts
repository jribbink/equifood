import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { METADATA_REALTIME, SUBSCRIPTIONS_MODULE_OPTIONS } from './constants';
import { EntitySubscriber } from './entity-subscriber';
@Injectable()
export class SubscriptionService implements OnModuleInit {
  private users: Map<WebSocket, any> = new Map();
  private subscribers: Map<string, EntitySubscriber> = new Map();
  private listenerInfo: Map<
    any,
    [total: number, entities: Set<EntitySubscriber>]
  > = new Map();

  constructor(
    @Inject(SUBSCRIPTIONS_MODULE_OPTIONS) private subscriptionsOptions,
    @InjectDataSource() readonly dataSource: DataSource
  ) {}

  async onModuleInit() {
    // Add subscribers to entities
    await Promise.all(
      this.dataSource.entityMetadatas.map(async (metadata) => {
        const authFn = Reflect.getMetadata(
          METADATA_REALTIME,
          metadata.target
        )?.authFn;
        if (authFn) {
          const subscriber = new EntitySubscriber(this, metadata, authFn);
          this.dataSource.subscribers.push(subscriber);
          this.subscribers.set(metadata.name, subscriber);
        }
      })
    );
  }

  subscribe(
    client: WebSocket,
    entity: string,
    criteria: FindOptionsWhere<any>
  ) {
    // If entity does not exist abort.  Do not return anything verbose to user to reveal entities which exist in DB
    if (!this.subscribers.has(entity)) return;

    const subscriber = this.subscribers.get(entity);
    const user = this.users.get(client);
    if (!user) return;

    // If listener added, add to global listener map
    if (subscriber.addListener(user, criteria)) {
      const userListeners = this.listenerInfo.get(user) ?? [0, new Set()];
      userListeners[0] += 1;
      userListeners[1].add(subscriber);
    }
  }

  unsubscribe(
    client: WebSocket,
    entity?: string,
    criteria?: FindOptionsWhere<any>
  ) {
    const user = this.users.get(client);
    if (!user) return;

    if (entity) {
      const subscriber = this.subscribers.get(entity);
      if (!subscriber) return;
      subscriber.removeListener(user, criteria);
    } else {
      // Remove all listeners
      const userListenerInfo = this.listenerInfo.get(user);
      if (!userListenerInfo) return;
      userListenerInfo[1].forEach((subscriber) => {
        subscriber.removeListener(user);
      });
    }
  }

  async authenticateUser(client: WebSocket, jwt: string) {
    const user = await this.subscriptionsOptions.validate(jwt);
    this.users.set(client, user);
    return user;
  }
}
