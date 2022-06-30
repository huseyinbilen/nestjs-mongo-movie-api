import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getUpcoming(): any {
    let result: any;
    result = this.httpService.get('https://api.themoviedb.org/3/movie/upcoming?api_key=6e1f740c910c580bda980e764c0033eb&language=en-US&page=1')
    .pipe(
      map(response => response.data.results
        // .map(film => film.title)
        )
    );
    return result;
  }

  getSearchedMovie(query: string): string {
    let result: any;
    result = this.httpService.get(`https://api.themoviedb.org/3/search/movie?api_key=6e1f740c910c580bda980e764c0033eb&language=en-US&query=${query}&page=1`)
    .pipe(
      map(response => response.data.results
        // .map(film => film.title)
        )
    );
    return result;
  }  
}
