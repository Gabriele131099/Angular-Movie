import { Component, Input, OnInit } from '@angular/core';

import { FilmsService } from 'src/app/services/films.service';
import { library, icon } from '@fortawesome/fontawesome-svg-core'

const camera = icon({ prefix: 'fas', iconName: 'camera' })

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss'],
})
export class CardContainerComponent implements OnInit {
  arrayFilms: any;
  filmsResult: any;
  arrayGenre: any;
  filtroGenre: any;
  nameGenre: any;
  constructor(private filmsService: FilmsService) {}

  getFilmsFromService(): any {
    this.filmsService.getFilms().subscribe((films) => {
      this.arrayFilms = films;
      this.filmsResult = this.arrayFilms.filter(
        (obj: any) =>
          obj.genre_ids.filter((ele: any) => ele == this.filtroGenre).length >
            0 || this.filtroGenre == 0
      );
      console.log(this.filtroGenre);
      console.log(this.filmsResult);
    });
  }
  getGenre(): any {
    this.filmsService.getGenre().subscribe((genre) => {
      this.arrayGenre = genre;
      const lunghezzaArrayGenre = this.arrayGenre.length;
      const numeroGenere = Math.floor(
        Math.random() * (lunghezzaArrayGenre - 0) + 0
      );
      this.filtroGenre = this.arrayGenre[numeroGenere].id;
      this.nameGenre = this.arrayGenre[numeroGenere].name;
      console.log(numeroGenere);
      console.log(this.arrayGenre);
    });
  }

  ngOnInit(): void {
    this.getGenre();
    this.getFilmsFromService();
  }
}
