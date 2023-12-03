import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ExceptionsFilter } from './auth/middleware/exception-handler.filter';
import { LoggingMiddleware } from './auth/middleware/logger';

@Module({
  imports: [AuthModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
