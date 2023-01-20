import { ExecutionContext } from '@nestjs/common';

export function resolveContext(ctx: ExecutionContext) {
  let request: any;
  switch (ctx.getType()) {
    case <any>'graphql':
      request = (ctx as any).args[2].req;
      break;
    case 'http':
      request = ctx.switchToHttp().getRequest();
      break;

    default:
      throw new Error('Unsupported context');
      break;
  }
  return {
    request,
  };
}
