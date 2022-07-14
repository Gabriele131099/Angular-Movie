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
  async filmUserList(listName: string, uid: string) {
    console.log(listName);
    console.log(uid);
    let listCollection = this.angularFirestore
      .collection(`${listName}`)
      .doc(`Zbex4p1gefeyWWsRh21JaZrjqmB2`)
      .collection('idFilms');
    return listCollection.valueChanges();
  }
  movieCollectionFilterByInput: any;
  wishListCollection: any =
    this.angularFirestore.collection<IMovie[]>('wishList');

  movieCollection: any = this.angularFirestore.collection<IMovie[]>('movies');

  genreCollection: any = this.angularFirestore.collection<IMovie[]>('genres');

  fileRef: any;

  //prova1 con json in .ts
  movies: any[] = MOVIES;
  //prova2 con json in .json
  moviesJ: any;

  constructor(
    private http: HttpClient,
    private angularFirestore: AngularFirestore
  ) {}
  queryMovieByGenre(genre: number) {
    let film: any = (this.movieCollectionFilterByInput =
      this.angularFirestore.collection<IMovie[]>(
        'movies',
        (ref) => ref.where('genre_ids', 'array-contains', genre) //filtro Titolo
      ));
    return film;
  }
  queryMovieById(id: number) {
    let film: any = (this.movieCollectionFilterByInput =
      this.angularFirestore.collection<IMovie[]>(
        'movies',
        (ref) => ref.where('id', '==', id) //filtro Titolo
      ));
    return film;
  }
  queryMoviesByInput(
    filterTitle: string,
    filterLang: string,
    filterGenre: any
  ): any {
    let tmpGenre: any = [];
    filterGenre.forEach((obj: any) => tmpGenre.push(obj.id));
    if (filterLang == 'all') {
      filterLang = 'en';
    }
    let filteredFilms: any = (this.movieCollectionFilterByInput =
      this.angularFirestore.collection<IMovie[]>(
        'movies',
        (ref) =>
          ref //concatena le query
            .where('original_language', '==', `${filterLang}`) //filtro Lingua
            .where('genre_ids', 'array-contains-any', tmpGenre) //filtro Generi
      ));
    console.log(tmpGenre);
    return filteredFilms;
  }

  async postMoviesFomFile(): Promise<void> {
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

  async postGenresFomFile(): Promise<void> {
    let genre = await this.http.get<any>('assets/json/genres.json').toPromise();
    console.log(genre);
    genre.genres.forEach(async (genreSingolo: any) => {
      await this.genreCollection
        .add(genreSingolo)
        .then((data: any) => {
          console.log(data);
        })
        .catch((error: any) => {
          console.log('errore in Post', error);
        });
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
