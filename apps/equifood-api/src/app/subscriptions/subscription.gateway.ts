import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { SubscriptionService } from './subscription.service';

@WebSocketGateway(3026)
export class SubscriptionGateway implements OnGatewayDisconnect {
  constructor(private subscriptionService: SubscriptionService) {}

  @SubscribeMessage('auth')
  async authenticate(client: WebSocket, jwt: string) {
    const user = await this.subscriptionService.authenticateUser(client, jwt);
    if (!user) client.send('UNAUTHORIZED');
  }

  @SubscribeMessage('subscribe')
  async handleMessage(client: WebSocket, token: string) {
    await this.subscriptionService.subscribe(client, token);
  }

  handleDisconnect(client: WebSocket) {
    this.subscriptionService.unsubscribe(client);
  }
}
