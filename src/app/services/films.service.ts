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

  // martina 06-06
  getTrendingFilms(): Observable<[]>{
    const urlTrendingProva = 'https://api.themoviedb.org/3/trending/movie/week?api_key=59609bb271fe57555250ffa18b2842c2'
    return this.http.get<[]>(urlTrendingProva);
  }

  getFilms(numberPageParam:any): Observable<[]> {
    const urlProva = `https://api.themoviedb.org/3/discover/movie?api_key=59609bb271fe57555250ffa18b2842c2&sort_by=popularity.desc&include_adult=false&include_video=true&page=${numberPageParam}`
    console.log(urlProva)
    return this.http.get<[]>(urlProva);
  }

  getGenre(): Observable<[]> {
    const urlProva = `https://api.themoviedb.org/3/genre/movie/list?api_key=59609bb271fe57555250ffa18b2842c2&language=en-US`
    console.log(urlProva)
    return this.http.get<[]>(urlProva);
  }
  // getFilm(id: number): Observable<any[]> {
  //   const arrayFilms = this.urlProva.result.find((h: { id: number; })=> h.id === id)!; //TODO FIX


  //   //return of(arrayFilms);
  //   return this.http.get<any[]>(this.urlProva);
  // }
}
