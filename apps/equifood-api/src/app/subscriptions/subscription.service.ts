import { Inject, Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

const SUBSCRIPTIONS_MODULE_OPTIONS = 'SUBSCRIPTIONS_MODULE_OPTIONS';

@Injectable()
export class SubscriptionService {
  private _messagesSubject: Subject<{
    client: WebSocket;
    message: string | Blob | ArrayBuffer | ArrayBufferView;
  }> = new Subject();
  $messages = this._messagesSubject.asObservable();

  private users: Map<object, any> = new Map();
  private subscriptions: Map<string, Set<WebSocket>> = new Map();

  constructor(@Inject(SUBSCRIPTIONS_MODULE_OPTIONS) private authValidator) {}

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
    (this.subscriptions.get(endpoint) ?? []).forEach(async (client) => {
      this._messagesSubject.next({ client, message }); // message?
    });
  }
}
