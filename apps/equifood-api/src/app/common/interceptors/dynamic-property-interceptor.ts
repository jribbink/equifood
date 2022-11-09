import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  PlainLiteralObject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DynamicPropertyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();

    return next.handle().pipe(
      map((res: PlainLiteralObject | Array<PlainLiteralObject>) => {
        function replaceProps(o: any) {
          for (const p in o) {
            if (typeof o[p] == 'function' && o[p].__isDynamic) {
              const orig = o[p];
              o[p] = orig(ctx.getRequest(), ctx.getResponse(), ctx.getNext());
            }
          }
          return o;
        }
        if (Array.isArray(res)) {
          res = res.map((o) => replaceProps(o));
        } else {
          res = replaceProps(res);
        }
        return res;
      })
    );
  }
}
