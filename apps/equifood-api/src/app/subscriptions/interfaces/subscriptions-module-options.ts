export interface SubscriptionsModuleOptions<T = any> {
  validator: (token: string) => Promise<T> | T;
}
