import { Observable } from 'rxjs';

interface WebsocketMessage {
  type: string;
}

type MessageType = SubscriptionRequest | SubscriptionResponse;

interface SubscriptionRequest extends WebsocketMessage {
  type: 'SubscriptionRequest';
  endpoint: string | string[];
}

interface SubscriptionResponse extends WebsocketMessage {
  type: 'SubscriptionResponse';
  status: 'granted' | 'denied';
  endpont: string | string[];
}

export class RealtimeBridge {
  private socket!: WebSocket;
  private subscriptions: Map<string, Observable<any>> = new Map();

  constructor(private url: string, private authorization?: string) {
    this.connect();
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onmessage = (e) => {
      const message: MessageType = JSON.parse(e.data);
      switch (message.type) {
        case 'SubscriptionResponse':
          this.subscriptions.break;
      }
    };

    this.socket = socket;
  }

  subscribe<T = any>(endpoint: string): Observable<T> {
    // Return existing observable if exists
    const observable = this.subscriptions.get(endpoint);
    if (observable) return observable;

    // Make subscription request to server
    const message: SubscriptionRequest = {
      type: 'SubscriptionRequest',
      endpoint,
    };
    this.socket.send(JSON.stringify(message));
  }
}
