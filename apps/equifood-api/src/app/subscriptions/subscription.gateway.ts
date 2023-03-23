import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
} from '@nestjs/websockets';
import { FindOptionsWhere } from 'typeorm';
import { SubscriptionService } from './subscription.service';

@WebSocketGateway(3026)
export class SubscriptionGateway {
  constructor(private subscriptionService: SubscriptionService) {}

  @SubscribeMessage('auth')
  async authenticate(client: WebSocket, jwt: string) {
    await this.subscriptionService.authenticateUser(client, jwt);
  }

  @SubscribeMessage('subscribe')
  handleMessage(client: WebSocket, _payload: string) {
    const payload: { entity: string; criteria: FindOptionsWhere<any> } =
      JSON.parse(_payload);
    this.subscriptionService.subscribe(
      client,
      payload.entity,
      payload.criteria
    );
  }
}
