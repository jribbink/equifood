import {
  ClassSerializerInterceptor,
  ExecutionContext,
  Module,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MerchantsModule } from './merchant/merchants.module';
import { UploadsModule } from './uploads/uploads.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DynamicPropertyInterceptor } from './common/interceptors/dynamic-property-interceptor';
import { OrdersModule } from './orders/orders.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { WebsocketValidator } from './auth/websocket-validator';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AdminModule } from './admin/admin.module';
import { User } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RealtimeInterceptor } from './subscriptions/interceptors/realtime-interceptor';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AppConfigModule,
    DatabaseModule,
    MerchantsModule,
    UploadsModule,
    OrdersModule,
    SubscriptionsModule.forRoot({
      imports: [AuthModule, ConfigModule],
      useFactory: (
        websocketValidator: WebsocketValidator,
        configService: ConfigService
      ) => {
        return {
          validate: websocketValidator.validate.bind(websocketValidator),
          resolveUserId: (user: User) => {
            return user.id;
          },
          getContextUser: (context: ExecutionContext) => {
            const { user } = context.switchToHttp().getRequest();
            return user;
          },
          jwtSecret: configService.getOrThrow('auth.secret'),
        };
      },
      inject: [WebsocketValidator, ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    AdminModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RealtimeInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DynamicPropertyInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
