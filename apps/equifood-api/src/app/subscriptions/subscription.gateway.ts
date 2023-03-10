import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@WebSocketGateway(3026)
export class SubscriptionGateway {
  constructor(private subscriptionService: SubscriptionService) {}

  @SubscribeMessage('auth')
  async authenticate(client: object, jwt: string) {
    await this.subscriptionService.authenticateUser(client, jwt);
  }

  @SubscribeMessage('subscribe')
  handleMessage(client: WebSocket, endpoint: string) {
    this.subscriptionService.subscribe(client, endpoint);
  }
}
