import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUpcoming(): string {
    return this.appService.getUpcoming();
  }

  @Get(':id')
  getSearchedMovie(@Param('id') movieTitle: string): string {
    return this.appService.getSearchedMovie(movieTitle);
  }
}
