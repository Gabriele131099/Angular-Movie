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
    const urlTrendingProva = 'http://localhost:8081/movieAPI/movie/allMovies'
    return this.http.get<[]>(urlTrendingProva);
  }

  getFilms(numberPageParam:any): Observable<[]> {
    const urlProva = `http://localhost:8081/movieAPI/movie/allMovies`
    return this.http.get<[]>(urlProva);
  }

  getGenre(): Observable<[]> {
    const urlProva = `http://localhost:8081/movieAPI/genre/allGenres`
    return this.http.get<[]>(urlProva);
  }
  // getFilm(id: number): Observable<any[]> {
  //   const arrayFilms = this.urlProva.result.find((h: { id: number; })=> h.id === id)!; //TODO FIX


  //   //return of(arrayFilms);
  //   return this.http.get<any[]>(this.urlProva);
  // }
}
