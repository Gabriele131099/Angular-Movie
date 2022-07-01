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

  films$: any = this.filmsService.movieCollection.valueChanges();
  backDropPath() {
    this.pathBackDrop =
      this.film?.backdrop_path != null
        ? 'https://image.tmdb.org/t/p/original/' + this.film?.backdrop_path
        : (this.pathBackDrop =
            'https://ak.picdn.net/shutterstock/videos/1010240090/thumb/1.jpg');
  }
  constructor(private filmsService: FilmsService) {}
  getFilmsFromFireBase(): any {
    this.films$.forEach((obj: any) => {
      obj.forEach((ele: any) => {
        this.filmsResult.push(ele);
        this.film = this.filmsResult[this.posizione];
        this.backDropPath();
      });
    });
  }

  slideShowRight() {
    if (this.posizione >= this.filmsResult.length - 1) {
      this.posizione = 0;
    } else {
      this.posizione++;
    }
    this.film = this.filmsResult[this.posizione];
    this.backDropPath();
  }
  slideShowLeft() {
    if (this.posizione <= 0) {
      this.posizione = this.filmsResult.length - 1;
    } else {
      this.posizione--;
    }
    this.film = this.filmsResult[this.posizione];
    this.backDropPath();
  }

  ngOnInit(): void {
    this.getFilmsFromFireBase();
    setInterval(() => {
      this.slideShowRight();
    }, 7000);
    console.log(this.films$);
  }
}
