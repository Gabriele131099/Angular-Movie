import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FILMS } from './assets/film';

@Injectable({ providedIn: 'root' })
export class FilmsService {

  constructor() { }

  getFilms(): Observable<any[]> {
    const arrayFilms = of(FILMS);
    return arrayFilms;
  }

  getFilm(id: number): Observable<any> {
    const arrayFilms = FILMS.find(h => h.id === id)!;
    return of(arrayFilms);
  }
}