import { RestReponse, SubscriptionsMetadata } from '@equifood/api-interfaces';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectDataSource } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { DataSource } from 'typeorm';
import { SUBSCRIPTIONS_HANDLER_METADATA } from '../../subscriptions/constants';
import { SubscribableRouteMetadata } from '../../subscriptions/interfaces/subscribable-route-metadata';

@Injectable()
export class RestInterceptor implements NestInterceptor {
  private entityMap: Map<any, [entity: string, pks: string[]]> = new Map();

  constructor(
    private reflector: Reflector,
    @InjectDataSource() private dataSource: DataSource
  ) {
    this.dataSource.entityMetadatas.forEach((metadata) => {
      this.entityMap.set(
        // eslint-disable-next-line @typescript-eslint/ban-types
        (metadata.target as Function).prototype.constructor,
        [metadata.name, metadata.primaryColumns.map((x) => x.propertyName)]
      );
    });
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<RestReponse> {
    const responseMetadata: SubscribableRouteMetadata =
      this.reflector.get<SubscribableRouteMetadata>(
        SUBSCRIPTIONS_HANDLER_METADATA,
        context.getHandler()
      ) ?? ({} as SubscribableRouteMetadata);

    let subscriptionsMetadata: SubscriptionsMetadata = null;
    if (responseMetadata?.entity) {
      const [entity, pks] = this.entityMap.get(
        responseMetadata.entity.prototype.constructor
      );
      subscriptionsMetadata = {
        entity,
        pks,
        isArray: responseMetadata?.opts?.isArray ?? false,
      };
    }

    return next.handle().pipe(
      map((data) => {
        return {
          data,
          _subscriptions: subscriptionsMetadata,
        };
      })
    );
  }
}
