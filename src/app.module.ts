import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TaskModule } from './task/task.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './common/middleware/jwt.middleware';
import { TaskController } from './task/task.controller';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { DailycheckinModule } from './dailycheckin/dailycheckin.module';
import { DailycheckinController } from './dailycheckin/dailycheckin.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {  APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    CommonModule,
    TaskModule,
    AuthModule,
    UserModule,
    DailycheckinModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 200,
    }]),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, JwtMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
      )
      .forRoutes(TaskController, UserController, DailycheckinController);
  }
}
