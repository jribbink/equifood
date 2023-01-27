import {
  CanActivate,
  ExecutionContext,
  mixin,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

export function DynamicAuthGuard(strategyFn: (req: any) => string) {
  class DynamicAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
      const req = context.switchToHttp().getRequest();
      const strategy = `${req.method.toLowerCase()}:${strategyFn(req)}`;

      if (req.query.redirect_uri)
        context
          .switchToHttp()
          .getResponse()
          .cookie('redirect_uri', req.query.redirect_uri);

      let authGuard: IAuthGuard;
      try {
        authGuard = new (AuthGuard(strategy))();
      } catch (e) {
        throw new NotFoundException();
      }

      return authGuard.canActivate(context);
    }
  }
  return mixin(DynamicAuthGuard);
}
