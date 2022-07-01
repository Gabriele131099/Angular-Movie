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
  filmsResult: any;
  arrayGenre: any;
  films$: any;
  // @Input()
  filterGenre: any;
  genres$: any = this.filmsService.genreCollection.valueChanges();
  nameGenre: any;

  constructor(private filmsService: FilmsService) {}
  getCasualGenre(): any {
    const lunghezzaArrayGenre = this.arrayGenre.length;
    const numeroGenere = Math.floor(
      Math.random() * (lunghezzaArrayGenre - 0) + 0
    );
    this.filterGenre = this.arrayGenre[numeroGenere].id;
    this.nameGenre = this.arrayGenre[numeroGenere].name;
  }
  displayAllCalls() {
    this.genres$.forEach((obj: any) => {
      this.arrayGenre = obj;

      this.getCasualGenre();

      this.films$ = this.filmsService
        .queryMovieByGenre(this.filterGenre)
        .valueChanges();

      this.films$.forEach((obj: any) => {
        this.filmsResult = obj;
        console.log(this.filmsResult);
      });
    });
  }
  ngOnInit(): void {
    this.displayAllCalls();
  }
}
