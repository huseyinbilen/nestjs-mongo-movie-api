import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Movie } from './movies.model';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>
  ) {}

  async insertMovie(name: string, desc: string, score: number) {
    const newMovie = new this.movieModel({
      name,
      description: desc,
      score,
    });
    const result = await newMovie.save();
    return result.id as string;
  }

  async getMovies() {
    // https://api.themoviedb.org/3/movie/upcoming?api_key=6e1f740c910c580bda980e764c0033eb&language=en-US&page=1
    // `https://api.themoviedb.org/3/search/movie?api_key=6e1f740c910c580bda980e764c0033eb&language=en-US&query=${query}&page=1`
    const movies = await this.movieModel.find().exec();
    return movies.map(movie => ({
      id: movie.id,
      name: movie.name,
      description: movie.description,
      score: movie.score
    }));
  }

  async getSingleMovie(movieId: string) {
    const movie = await this.movieModel.findById(movieId);
    return {
      id: movie.id,
      name: movie.name,
      description: movie.name,
      score: movie.score
    };
  }

  async updateMovie(movieId: string, name: string, desc: string, score: number) {
    const updatedMovie = await this.findMovie(movieId);
    if(name) {
      updatedMovie.name = name;
    }
    if(desc) {
      updatedMovie.description = desc;
    }
    if(score) {
      updatedMovie.score = score;
    }
    updatedMovie.save();
  }

  async deleteMovie(movieId: string) {
    const results = await this.movieModel.deleteOne({_id: movieId}).exec();
    if(results == null) {
      throw new NotFoundException('Could not find movie.');
    }
  }

  private async findMovie(id: string): Promise<Movie> {
    let movie;
    try {
      movie = await this.movieModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find movie.');
    }
    if (!movie) {
      throw new NotFoundException('Could not find movie.');
    }
    return movie;
  }
}
