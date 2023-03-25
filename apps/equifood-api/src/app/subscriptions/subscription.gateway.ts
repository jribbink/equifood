import { RealtimeSubscriptionRequest } from '@equifood/api-interfaces';
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
  handleMessage(client: WebSocket, _payload: string) {
    const payload: RealtimeSubscriptionRequest = JSON.parse(_payload);

    this.subscriptionService.subscribe(
      client,
      payload.entity,
      payload.criteria,
      payload.key
    );
  }

  handleDisconnect(client: WebSocket) {
    this.subscriptionService.unsubscribe(client);
  }
}
