import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityMetadata } from 'typeorm';
import {
  METADATA_REALTIME,
  SUBSCRIPTIONS_JWT_AUDIENCE,
  SUBSCRIPTIONS_MODULE_OPTIONS,
} from './constants';
import { EntitySubscriber } from './entity-subscriber';
import { SubscriptionsMetadata } from './interfaces/subscriptions-metadata';
import { SubscriptionsModuleOptions } from './interfaces/subscriptions-module-options';
import { EntityMetadataRealtime } from './interfaces/entity-metadata-realtime';

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

  public entityNameMap: Map<any, string> = new Map();
  public entityClassMap: Map<string, any> = new Map();
  public entityMetadataMap: Map<string, EntityMetadata> = new Map();

  constructor(
    @Inject(SUBSCRIPTIONS_MODULE_OPTIONS)
    private subscriptionsOptions: SubscriptionsModuleOptions,
    private jwtService: JwtService,
    @InjectDataSource() readonly dataSource: DataSource
  ) {
    this.dataSource.entityMetadatas.forEach((metadata) => {
      this.entityNameMap.set(
        // eslint-disable-next-line @typescript-eslint/ban-types
        (metadata.target as Function).prototype.constructor,
        metadata.name
      );
      this.entityClassMap.set(
        metadata.name,
        // eslint-disable-next-line @typescript-eslint/ban-types
        (metadata.target as Function).prototype.constructor
      );
      this.entityMetadataMap.set(metadata.name, metadata);
    });
  }

  async onModuleInit() {
    // Add subscribers to entities
    this.dataSource.entityMetadatas.forEach((metadata) => {
      const realtimeMetadata: EntityMetadataRealtime = Reflect.getMetadata(
        METADATA_REALTIME,
        metadata.target
      );
      if (realtimeMetadata) {
        const subscriber = new EntitySubscriber(
          this,
          metadata,
          realtimeMetadata,
          this.dataSource.getRepository(metadata.target)
        );
        this.dataSource.subscribers.push(subscriber);
        this.subscribers.set(metadata.name, subscriber);
      }
    });
  }

  async subscribe(client: WebSocket, token: string) {
    const { entity, key, where, userId } =
      await this.jwtService.verifyAsync<SubscriptionsMetadata>(token, {
        audience: SUBSCRIPTIONS_JWT_AUDIENCE,
      });

    // If entity does not exist abort.  Do not return anything verbose to user to reveal entities which exist in DB
    if (!this.subscribers.has(entity)) return;

    // If key in use abort
    if (this.keySet.has(key)) return;

    const subscriber = this.subscribers.get(entity);

    const userListeners = this.listenerInfo.get(userId) ?? [0, new Set()];
    if (userListeners[0] >= MAX_SUBSCRIPTIONS_PER_USER) {
      throw new UnauthorizedException(
        `Maximum listeners exceeded for user ${userId}`
      );
    }

    // If listener added, add to global listener map
    if (subscriber.addListener(userId, where, key)) {
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
    return user;
  }

  async createToken(subscriptionsMetadata: SubscriptionsMetadata) {
    return await this.jwtService.signAsync(subscriptionsMetadata, {
      expiresIn: 60,
      audience: SUBSCRIPTIONS_JWT_AUDIENCE,
    });
  }

  dispatch(userId: string | number, message: string) {
    this.reverseUsers.get(userId).send(message);
  }
}
