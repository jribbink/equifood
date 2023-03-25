export interface SubscriptionsMetadata {
  entity: string; //entity which can be subscribed to
  pks: string[];
  isArray: boolean;
}

export interface RestReponse<T = any> {
  data: T;
  _subscriptions: SubscriptionsMetadata;
}
