import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from '././auth-middleware';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MoviesModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb://db:27017/nestjs-movie',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/movies');
  }
}

