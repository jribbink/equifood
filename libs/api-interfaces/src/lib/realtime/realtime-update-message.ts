export interface RealtimeUpdateMessage {
  type: 'insert' | 'update' | 'delete';
  criteria: any;
  entity: string;
  data: any;
  target: string;
}
