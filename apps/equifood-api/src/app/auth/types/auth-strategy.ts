import { PassportStrategy, Type } from '@nestjs/passport';

export function AuthStrategy<T extends Type<any> = any>(
  strategy: T,
  name: string,
  method: 'GET' | 'POST'
) {
  return PassportStrategy(strategy, `${method.toLowerCase()}:${name}`);
}
