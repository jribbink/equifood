import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { METADATA_REALTIME, SUBSCRIPTIONS_MODULE_OPTIONS } from './constants';
import { EntitySubscriber } from './entity-subscriber';
import { SubscriptionsModuleOptions } from './interfaces/subscriptions-module-options';

const MAX_SUBSCRIPTIONS_PER_USER = 100;

@Injectable()
export class SubscriptionService<User = any> implements OnModuleInit {
  private users: Map<WebSocket, User> = new Map();
  private reverseUsers: Map<string | number, WebSocket> = new Map();
  private subscribers: Map<string, EntitySubscriber> = new Map();
  private listenerInfo: Map<
    string | number,
    [total: number, entities: Set<EntitySubscriber>]
  > = new Map();
  private keySet: Set<string> = new Set();

  constructor(
    @Inject(SUBSCRIPTIONS_MODULE_OPTIONS)
    private subscriptionsOptions: SubscriptionsModuleOptions,
    @InjectDataSource() readonly dataSource: DataSource
  ) {}

  async onModuleInit() {
    // Add subscribers to entities
    this.dataSource.entityMetadatas.forEach((metadata) => {
      const authFn = Reflect.getMetadata(
        METADATA_REALTIME,
        metadata.target
      )?.authFn;
      if (authFn) {
        const subscriber = new EntitySubscriber(this, metadata, authFn);
        this.dataSource.subscribers.push(subscriber);
        this.subscribers.set(metadata.name, subscriber);
      }
    });
  }

  subscribe(
    client: WebSocket,
    entity: string,
    criteria: FindOptionsWhere<any>,
    key: string
  ) {
    console.log('SUBSCRIBE');
    // If entity does not exist abort.  Do not return anything verbose to user to reveal entities which exist in DB
    if (!this.subscribers.has(entity)) return;

    // If key in use abort
    if (this.keySet.has(key)) return;

    const subscriber = this.subscribers.get(entity);
    const user = this.users.get(client);
    console.log(user);
    if (!user) return;
    const userId = this.subscriptionsOptions.resolveUserId(user);

    console.log(userId);

    const userListeners = this.listenerInfo.get(userId) ?? [0, new Set()];
    if (userListeners[0] >= MAX_SUBSCRIPTIONS_PER_USER) {
      throw new UnauthorizedException(
        `Maximum listeners exceeded for user ${userId}`
      );
    }

    // If listener added, add to global listener map
    if (subscriber.addListener(userId, criteria, key)) {
      userListeners[0] += 1;
      userListeners[1].add(subscriber);
    }

    // Add key to keyset
    this.keySet.add(key);
  }

  unsubscribe(client: WebSocket, key?: string) {
    const user = this.users.get(client);
    if (!user) return;
    const userId = this.subscriptionsOptions.resolveUserId(user);

    if (key) {
      const parsed = JSON.parse(key);
      const subscriber = this.subscribers.get(parsed.entity);
      if (!subscriber) return;
      subscriber.removeListener(userId, key);
    } else {
      // Remove all listeners
      const userListenerInfo = this.listenerInfo.get(
        this.subscriptionsOptions.resolveUserId(user)
      );
      if (!userListenerInfo) return;
      userListenerInfo[1].forEach((subscriber) => {
        subscriber.removeListener(userId);
      });
    }
  }

  async authenticateUser(client: WebSocket, jwt: string) {
    const user = await this.subscriptionsOptions.validate(jwt);
    this.users.set(client, user);
    this.reverseUsers.set(
      this.subscriptionsOptions.resolveUserId(user),
      client
    );
    client.send('AUTHENTICATED');
    console.log('AUTHN');
    return user;
  }

  dispatch(userId: string | number, message: string) {
    this.reverseUsers.get(userId).send(message);
  }
}
