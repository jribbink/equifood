import { ExecutionContext } from '@nestjs/common';

export interface SubscriptionsModuleOptions<User = any> {
  validate: (token: string) => Promise<User> | User;
  resolveUserId: (user: User) => string | number;
  getContextUser: (context: ExecutionContext) => User;
  jwtSecret: string;
}
