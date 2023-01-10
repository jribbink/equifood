export interface SubscriptionsModuleOptions {
  validator: (token: string) => Promise<any> | any;
}
