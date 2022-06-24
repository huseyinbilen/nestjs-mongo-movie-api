import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Post()
  async addMovie(
    @Body('name') movieName: string,
    @Body('description') movieDesc: string,
    @Body('score') movieScore: number,    
  ) {
    const generatedId = await this.moviesService.insertMovie(
      movieName,
      movieDesc,
      movieScore
    );
    return {id: generatedId};
  }

  @Get()
  async getAllMovies() {
    const movies = this.moviesService.getMovies();
    return movies;
  }

  @Get(':id')
  async getMovie(@Param('id') movieId: string) {
    return this.moviesService.getSingleMovie(movieId);
  }

  @Patch(':id')
  async updateMovie(
    @Param('id') movieId: string, 
    @Param('name') movieName: string,
    @Param('description') movieDesc: string,
    @Param('score') movieScore: number
    ) {
    await this.moviesService.updateMovie(movieId, movieName, movieDesc, movieScore);
    return null;
  }

  @Delete(':id')
  async removeMovie(@Param('id') movieId: string) {
    await this.moviesService.deleteMovie(movieId);
    return null;
  }
}
