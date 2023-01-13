import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  PlainLiteralObject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { resolveContext } from '../utils/resolve-context';

@Injectable()
export class DynamicPropertyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = resolveContext(context);

    return next.handle().pipe(
      map((res: PlainLiteralObject | Array<PlainLiteralObject>) => {
        const v = new Set();
        function replaceProps(o: any, v: Set<any>) {
          if (v.has(o)) return;
          v.add(o);
          for (const p in o) {
            if (typeof o[p] == 'function' && o[p].__isDynamic) {
              const orig = o[p];
              o[p] = orig(ctx.request, null, null);
            } else {
              replaceProps(o[p], v);
            }
          }
        }
        replaceProps(res, v);
        return res;
      })
    );
  }
}
