import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MerchantsModule } from './merchant/merchants.module';
import { UploadsModule } from './uploads/uploads.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DynamicPropertyInterceptor } from './common/interceptors/dynamic-property-interceptor';
import { OrdersModule } from './orders/orders.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    AppConfigModule,
    DatabaseModule,
    MerchantsModule,
    UploadsModule,
    OrdersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [
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
