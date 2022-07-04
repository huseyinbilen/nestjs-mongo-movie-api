import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';

@ApiTags('Movies')
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

  @Delete(':id')
  async removeMovie(@Param('id') movieId: string) {
    await this.moviesService.deleteMovie(movieId);
    return null;
  }
}
