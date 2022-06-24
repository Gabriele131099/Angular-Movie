import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FilmsService {

  constructor(
    private http:HttpClient
  ) {  }
  numberPage:number = 1
  arrayFilmsAll:any

  getTrendingFilms(): Observable<[]>{
   // https://api.themoviedb.org/3/trending/movie/week?api_key=59609bb271fe57555250ffa18b2842c2
    const urlTrendingProva = 'https://api.themoviedb.org/3/trending/movie/week?api_key=59609bb271fe57555250ffa18b2842c2'
    return this.http.get<[]>(urlTrendingProva);
  }

  getFilms(): Observable<[]> {
    const urlProva = `http://localhost:8081/movieAPI/movie/allMovies`
    return this.http.get<[]>(urlProva);
  }

  getGenre(): Observable<[]> {
    const urlProva = `http://localhost:8081/movieAPI/genre/allGenres`
    return this.http.get<[]>(urlProva);
  }

}
