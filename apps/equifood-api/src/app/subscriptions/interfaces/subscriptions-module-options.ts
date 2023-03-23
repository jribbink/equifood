export interface SubscriptionsModuleOptions<T = any> {
  validate: (token: string) => Promise<T> | T;
}
