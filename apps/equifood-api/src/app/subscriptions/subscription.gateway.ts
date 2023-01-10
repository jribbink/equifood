import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { WebSocketServer } from 'ws';

@WebSocketGateway(3026)
export class SubscriptionGateway implements OnGatewayInit {
  private logger: Logger = new Logger('AppGateway');

  constructor(private subscriptionService: SubscriptionService) {}

  afterInit(server: WebSocketServer) {
    this.subscriptionService.$messages.subscribe(({ client, message }) => {
      client.send(message);
    });
  }

  @SubscribeMessage('auth')
  async authenticate(client: object, jwt: string) {
    await this.subscriptionService.authenticateUser(client, jwt);
  }

  @SubscribeMessage('subscribe')
  async handleMessage(client: WebSocket, endpoint: string) {
    await this.subscriptionService.subscribe(client, endpoint);
  }
}
