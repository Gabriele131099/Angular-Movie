import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { MOVIES } from 'src/assets/json/movies';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { IMovie } from '../Interfaces/IMovies';

@Injectable({ providedIn: 'root' })
export class FilmsService {
  numberPage: number = 1;
  arrayFilmsAll: any;

  movieCollectionFilterByInput: any;

  movieCollection: any = this.angularFirestore.collection<IMovie[]>('movies');

  fileRef: any;

  //prova1 con json in .ts
  movies: any[] = MOVIES;

  //prova2 con json in .json
  moviesJ: any;

  constructor(
    private http: HttpClient,
    private angularFirestore: AngularFirestore
  ) {}

  queryMoviesByInput(input: string): AngularFirestoreCollection<IMovie[]> {
    let filteredFilms: AngularFirestoreCollection<IMovie[]> =
      (this.movieCollectionFilterByInput = this.angularFirestore.collection<
        IMovie[]
      >('movies', (ref) => ref.where('title', '!=', `${input}`)));
    return filteredFilms;
  }

  async postMoviesFromFile(): Promise<void> {
    let film = await this.http.get<any>('assets/json/movies.json').toPromise();
    console.log(film);
    film.movies.forEach(async (filmSingolo: IMovie) => {
      await this.movieCollection
        .add(filmSingolo)
        .then((data: any) => {
          console.log(data);
        })
        .catch((error: any) => {
          console.log('errore in Post', error);
        }); // metodo add delle collection gestisce anche loffline
    });
  }

  getTrendingFilms(): Observable<[]> {
    // https://api.themoviedb.org/3/trending/movie/week?api_key=59609bb271fe57555250ffa18b2842c2
    const urlTrendingProva =
      'https://api.themoviedb.org/3/trending/movie/week?api_key=59609bb271fe57555250ffa18b2842c2';
    return this.http.get<[]>(urlTrendingProva);
  }

  getFilms(): Observable<[]> {
    const urlProva = `http://localhost:8081/movieAPI/movie/allMovies`;
    return this.http.get<[]>(urlProva);
  }

  getGenre(): Observable<[]> {
    const urlProva = `http://localhost:8081/movieAPI/genre/allGenres`;
    return this.http.get<[]>(urlProva);
  }
}
