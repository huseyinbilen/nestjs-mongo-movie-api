import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MovieSchema } from './movies.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Movie', schema: MovieSchema}]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
