import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { resolveContext } from '../../common/utils/resolve-context';

@Injectable()
export class JwtAuthGuard extends AuthGuard('post:jwt') {
  getRequest(context: ExecutionContext) {
    const { request } = resolveContext(context);
    return request;
  }
}
