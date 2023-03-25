export interface SubscriptionsModuleOptions<User = any> {
  validate: (token: string) => Promise<User> | User;
  resolveUserId: (user: User) => string | number;
}
