import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { IMovie } from 'src/app/Interfaces/IMovies';

const camera = icon({ prefix: 'fas', iconName: 'camera' });

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron-home.component.html',
  styleUrls: ['./jumbotron-home.component.scss'],
})
export class JumbotronHomeComponent implements OnInit {
  arrayFilms: any;
  filmsResult: any = [];
  posizione: number = 0;
  film: any;
  pathBackDrop: string = '';

  // films$: any = this.filmsService.movieCollection.valueChanges();
  //('items', ref => ref.where('size', '==', 'large'))
  films$: any = this.filmsService.movieCollection.valueChanges();

  constructor(private filmsService: FilmsService) {}
  getFilmsFromFireBase(): any {
    this.films$.forEach((obj: any) => {
      obj.forEach((ele: any) => {
        this.filmsResult.push(ele);
        this.film = this.filmsResult[this.posizione];
        this.pathBackDrop =
          'https://image.tmdb.org/t/p/original/' + this.film.backdrop_path;
      });
    });
  }
  // getFilmsFromService(): any {
  //   this.filmsService.getTrendingFilms().subscribe((films: any) => {
  //     this.arrayFilms = films;
  //     this.filmsResult = this.arrayFilms.results;
  //     this.film = this.filmsResult[this.posizione];
  //     this.pathBackDrop =
  //       'https://image.tmdb.org/t/p/original/' + this.film.backdrop_path;
  //   });
  // }

  slideShowRight() {
    if (this.posizione >= this.filmsResult.length - 1) {
      this.posizione = 0;
    } else {
      this.posizione++;
    }
    this.film = this.filmsResult[this.posizione];
    this.pathBackDrop =
      'https://image.tmdb.org/t/p/original/' + this.film.backdrop_path;
  }
  slideShowLeft() {
    if (this.posizione <= 0) {
      this.posizione = this.filmsResult.length - 1;
    } else {
      this.posizione--;
    }
    this.film = this.filmsResult[this.posizione];
    this.pathBackDrop =
      'https://image.tmdb.org/t/p/original/' + this.film.backdrop_path;
  }

  ngOnInit(): void {
    this.getFilmsFromFireBase();
    setInterval(() => {
      this.slideShowRight();
    }, 7000);
    console.log(this.films$);
  }
}
