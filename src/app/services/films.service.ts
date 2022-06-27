import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { MOVIES } from 'src/assets/json/movies';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IMovie } from '../Interfaces/IMovies';

@Injectable({ providedIn: 'root' })
export class FilmsService {
  numberPage: number = 1;
  arrayFilmsAll: any;

  movieCollection: any = this.angularFirestore.collection('movies');
  fileRef: any;

  //prova1 con json in .ts
  movies: any[] = MOVIES;

  //prova2 con json in .json
  moviesJ: any;

  constructor(
    private http: HttpClient,
    private angularFirestore: AngularFirestore
  ) {
    //prova2
    this.http.get('assets/json/data.json').subscribe((res) => {
      this.moviesJ = res;
      console.log('--- result :: ', this.moviesJ);
    });
  }

  // getMoviesFomFile(): Observable<[]> {
  //   return this.http.get('src/assets/json/movies.json')
  //     .map((response: Response) => <[]>response.json())
  //     .do((data) => console.log('All: ' + JSON.stringify(data)))
  //     .catch(this.handleError);
  // }

  // getMoviesFomFile(): void {
  //   this.movieCollection.add({ movie: this.moviesJ }).then((data: any) => {
  //     console.log(data);
  //   }); // metodo add delle collection gestisce anche loffline
  // }

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
