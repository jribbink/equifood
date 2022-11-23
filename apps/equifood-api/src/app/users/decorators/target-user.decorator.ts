import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TargetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.targetUser;
  }
);
