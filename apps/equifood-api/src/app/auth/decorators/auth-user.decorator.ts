import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { resolveContext } from '../../common/utils/resolve-context';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const {
      request: { user },
    } = resolveContext(ctx);
    return user;
  }
);
