import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FilmsService {

  constructor(
    private http:HttpClient
  ) {  }

  private urlProva:any = "https://api.themoviedb.org/3/discover/movie?api_key=59609bb271fe57555250ffa18b2842c2"

  getFilms(): Observable<[]> {
    //const arrayFilms = of(this.urlProva.results);
    //return arrayFilms;
    console.log(this.urlProva.results)
    return this.http.get<[]>(this.urlProva.results.id);
  }

  getFilm(id: number): Observable<any[]> {
    const arrayFilms = this.urlProva.find((h: { id: number; })=> h.id === id)!; //TODO FIX
    //return of(arrayFilms);
    return this.http.get<any[]>(this.urlProva);
  }
}