import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { map } from 'rxjs';

import { Movie } from './movies.model';

@Injectable()
export class MoviesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
    ) {}

  async insertMovie(name: string, desc: string, score: number, user: string) {
    const newMovie = new this.movieModel({
      name,
      description: desc,
      score,
      user
    });
    const result = await newMovie.save();
    return result.id as string;
  }

  async addMovie (movieId: string, req: any) {
    let result: any;
    result = this.httpService.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=6e1f740c910c580bda980e764c0033eb&language=en-US`)
    .pipe();
    result.subscribe(
      (value) => {
        let movieName = value.data.title;
        let movieDescription = value.data.overview;
        let movieScore = value.data.vote_average;
        let user = req.session.userID;
        this.insertMovie(movieName, movieDescription, movieScore, user);
        // console.log(movieName, movieDescription, movieScore);
        value.data.title;
      }
    );
    return result.subscribe(
      (value) => {
        return value.data.title;
      }
    );
  }

  async getMovies(req: any) {
    const movies = await this.movieModel.find({user: req.session.userID}).exec();
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
