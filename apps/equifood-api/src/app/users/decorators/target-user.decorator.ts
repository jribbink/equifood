import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { resolveContext } from '../../common/utils/resolve-context';

export const TargetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { request } = resolveContext(ctx);
    return request.targetUser;
  }
);
