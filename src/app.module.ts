import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    MoviesModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nestjs-mongo',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
