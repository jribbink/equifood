import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { SubscriptionService } from './subscription.service';

@WebSocketGateway(3026)
export class SubscriptionGateway
  implements OnGatewayDisconnect, OnGatewayConnection
{
  constructor(private subscriptionService: SubscriptionService) {}

  @SubscribeMessage('subscribe')
  async handleMessage(client: WebSocket, token: string) {
    await this.subscriptionService.subscribe(client, token);
  }

  handleDisconnect(client: WebSocket) {
    this.subscriptionService.unsubscribe(client);
    this.subscriptionService.removeSocket(client);
  }

  handleConnection(client: any) {
    this.subscriptionService.addSocket(client);
  }
}
