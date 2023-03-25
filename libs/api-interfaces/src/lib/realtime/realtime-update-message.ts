export interface RealtimeUpdateMessage {
  type: 'insert' | 'update' | 'delete';
  data: any;
  key: string;
}
