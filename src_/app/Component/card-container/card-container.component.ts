import { Component, Input, OnInit } from '@angular/core';

import { FilmsService } from 'src/app/services/films.service';
import { library, icon } from '@fortawesome/fontawesome-svg-core';

const camera = icon({ prefix: 'fas', iconName: 'camera' });

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss'],
})
export class CardContainerComponent implements OnInit {
  // arrayFilms: any;
  filmsResult: any = [];
  arrayGenre: any;
  filtroGenre: any;
  nameGenre: any;

  films$: any = this.filmsService.movieCollection.valueChanges();
  genres$: any = this.filmsService.genreCollection.valueChanges();

  constructor(private filmsService: FilmsService) {}

  ngOnInit(): void {
    // this.getFilmsFromService();
    this.films$ = this.filmsService.movieCollection.valueChanges();
    this.genres$ = this.filmsService.genreCollection.valueChanges();

    this.genres$.forEach((obj: any) => {
      this.arrayGenre = obj.filter((ele: any) => ele.name == 'Action')[0];
      console.log(this.arrayGenre);
    });

    this.films$.forEach((obj: any) => {
      console.log(this.arrayGenre);
      this.filmsResult = obj.filter((element: any) => {
        element.genre_ids.filter((ele: any) => ele == this.arrayGenre.id)
          .length > 0;
      });
      console.log(this.filmsResult);
    });
  }
}
