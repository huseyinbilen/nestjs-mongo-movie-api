import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Post(':id')
  async addMovie(
    @Param('id') movieId: string, 
    @Req() req: any   
  ) {
    const generatedId = await this.moviesService.addMovie(
      movieId,
      req
    );
    return {id: generatedId};
  }

  @Get()
  async getAllMovies(@Req() req: any) {
    const movies = this.moviesService.getMovies(req);
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
