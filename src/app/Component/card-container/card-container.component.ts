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
  filmsResult: any;
  arrayGenre: any;
  // filtroGenre: any;
  // nameGenre: any;

  films$: any = this.filmsService.movieCollection.valueChanges();
  genres$: any = this.filmsService.genreCollection.valueChanges();

  constructor(private filmsService: FilmsService) {}

  // getGenre(): any {

  //     const lunghezzaArrayGenre = this.genres$.length;
  //     const numeroGenere = Math.floor(
  //       Math.random() * (lunghezzaArrayGenre - 0) + 0
  //     );
  //     this.filtroGenre = this.arrayGenre[numeroGenere].id;
  //     this.nameGenre = this.arrayGenre[numeroGenere].name;
  //     console.log(numeroGenere);
  //     console.log(this.arrayGenre);
  //   });
  // }

  ngOnInit(): void {
    // this.getGenre();
    // this.getFilmsFromService();
    this.genres$.forEach((obj: any) => {
      this.arrayGenre = obj;
      console.log(this.arrayGenre);
    });

    this.films$.forEach((obj: any) => {
      this.filmsResult = obj;
      console.log(this.filmsResult);
    });
  }
}
