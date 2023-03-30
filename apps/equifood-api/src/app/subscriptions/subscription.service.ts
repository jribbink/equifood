import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityMetadata } from 'typeorm';
import { METADATA_REALTIME, SUBSCRIPTIONS_JWT_AUDIENCE } from './constants';
import { EntitySubscriber } from './entity-subscriber';
import { SubscriptionsMetadata } from './interfaces/subscriptions-metadata';
import { EntityMetadataRealtime } from './interfaces/entity-metadata-realtime';
import { randomUUID } from 'crypto';
import { SubscriptionMessageBuffer } from './subscription-message-queue';

const MAX_SUBSCRIPTIONS_PER_USER = 100;
@Injectable()
export class SubscriptionService {
  private clients: Map<WebSocket, string> = new Map();
  private reverseClients: Map<string, WebSocket> = new Map();
  private subscribers: Map<string, EntitySubscriber> = new Map();
  private listenerInfo: Map<
    string | number,
    [total: number, entities: Set<EntitySubscriber>]
  > = new Map();
  private keySet: Set<string> = new Set();
  private messageQueue: SubscriptionMessageBuffer =
    new SubscriptionMessageBuffer();
  public entityNameMap: Map<any, string> = new Map();
  public entityClassMap: Map<string, any> = new Map();
  public entityMetadataMap: Map<string, EntityMetadata> = new Map();

  constructor(
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

    const pendingDependents: Map<
      string,
      [subscriber: EntitySubscriber, path: string[]][]
    > = new Map();

    // Add subscribers to entities using DFS
    const stack = [
      ...this.dataSource.entityMetadatas.filter((x) =>
        Reflect.hasMetadata(METADATA_REALTIME, x.target)
      ),
    ];

    while (stack.length > 0) {
      const metadata = stack.pop();
      if (this.subscribers.has(metadata.name)) continue;

      const realtimeMetadata: EntityMetadataRealtime = Reflect.getMetadata(
        METADATA_REALTIME,
        metadata.target
      );

      const subscriber = new EntitySubscriber(
        this,
        metadata,
        realtimeMetadata?.relations ?? {},
        this.dataSource.getRepository(metadata.target)
      );

      // Add pending dependents to subscriber
      const dependents = pendingDependents.get(metadata.name) ?? [];
      dependents.forEach(([dependentSubscriber, path]) => {
        subscriber.registerDependent(dependentSubscriber, path);
      });

      // Add pending dependencies to hashmap and stack if necessary
      subscriber.relationDependencies.forEach(([depName, path]) => {
        if (this.subscribers.has(depName)) {
          this.subscribers.get(depName).registerDependent(subscriber, path);
        } else {
          const dependents = pendingDependents.get(depName) ?? [];
          dependents.push([subscriber, path]);
          pendingDependents.set(depName, dependents);
          stack.push(this.entityMetadataMap.get(depName));
        }
      });

      this.dataSource.subscribers.push(subscriber);
      this.subscribers.set(metadata.name, subscriber);
    }
  }

  async subscribe(client: WebSocket, token: string) {
    const { entity, key, where } =
      await this.jwtService.verifyAsync<SubscriptionsMetadata>(token, {
        audience: SUBSCRIPTIONS_JWT_AUDIENCE,
      });

    const clientId = this.clients.get(client);

    // If entity does not exist abort.  Do not return anything verbose to user to reveal entities which exist in DB
    if (!this.subscribers.has(entity)) return;

    // If key in use abort
    if (this.keySet.has(key)) return;

    const subscriber = this.subscribers.get(entity);

    const userListeners = this.listenerInfo.get(clientId) ?? [0, new Set()];
    if (userListeners[0] >= MAX_SUBSCRIPTIONS_PER_USER) {
      throw new UnauthorizedException(
        `Maximum listeners exceeded for WS client ${clientId}`
      );
    }

    // If listener added, add to global listener map
    if (subscriber.addListener(clientId, where, key)) {
      userListeners[0] += 1;
      userListeners[1].add(subscriber);
    }

    // Add key to keyset
    this.keySet.add(key);
  }

  unsubscribe(client: WebSocket, key?: string) {
    const clientId = this.clients.get(client);
    if (!clientId) return;

    if (key) {
      const parsed = JSON.parse(key);
      const subscriber = this.subscribers.get(parsed.entity);
      if (!subscriber) return;
      subscriber.removeListener(clientId, key);
    } else {
      // Remove all listeners
      const userListenerInfo = this.listenerInfo.get(clientId);
      if (!userListenerInfo) return;
      userListenerInfo[1].forEach((subscriber) => {
        subscriber.removeListener(clientId);
      });
    }
  }

  async createToken(subscriptionsMetadata: SubscriptionsMetadata) {
    return await this.jwtService.signAsync(subscriptionsMetadata, {
      expiresIn: 60,
      audience: SUBSCRIPTIONS_JWT_AUDIENCE,
    });
  }

  dispatch(clientId: string, key: string) {
    const socket: WebSocket = this.reverseClients.get(clientId);
    if (socket) {
      this.messageQueue.enqueue(socket, key);
    } else {
      this.removeSocket(socket);
    }
  }

  addSocket(client: WebSocket) {
    const id = randomUUID();
    this.clients.set(client, id);
    this.reverseClients.set(id, client);
  }

  removeSocket(client: WebSocket) {
    const id = this.clients.get(client);
    if (!id) return;
    this.unsubscribe(client);
    this.clients.delete(client);
    this.reverseClients.delete(id);
  }
}
