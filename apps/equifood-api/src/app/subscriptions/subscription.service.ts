import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { METADATA_REALTIME } from './constants';
import { EntitySubscriber } from './entity-subscriber';

const SUBSCRIPTIONS_MODULE_OPTIONS = 'SUBSCRIPTIONS_MODULE_OPTIONS';

@Injectable()
export class SubscriptionService implements OnModuleInit {
  private users: Map<object, any> = new Map();
  private subscriptions: Map<string, Set<WebSocket>> = new Map();

  constructor(
    @Inject(SUBSCRIPTIONS_MODULE_OPTIONS) private authValidator,
    @InjectDataSource() readonly dataSource: DataSource,
    private moduleRef: ModuleRef
  ) {}

  async onModuleInit() {
    // Add subscribers to entities
    await Promise.all(
      this.dataSource.entityMetadatas.map(async (metadata) => {
        const authFn = Reflect.getMetadata(METADATA_REALTIME, metadata.target);
        if (authFn)
          this.dataSource.subscribers.push(
            new EntitySubscriber(
              this,
              metadata,
              await this.moduleRef.resolve(authFn)
            )
          );
      })
    );
  }

  subscribe(client: WebSocket, endpoint: string) {
    const subscribers = this.subscriptions.get(endpoint) ?? new Set();
    subscribers.add(client);
    this.subscriptions.set(endpoint, subscribers);
  }

  async authenticateUser(client: object, jwt: string) {
    const user = await this.authValidator.validate(jwt);
    this.users.set(client, user);
  }

  dispatch(endpoint: string, message: string) {
    (this.subscriptions.get(endpoint) ?? []).forEach(
      async (client: WebSocket) => {
        client.send(message);
      }
    );
  }
}
