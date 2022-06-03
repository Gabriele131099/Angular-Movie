import { Component, Input, OnInit } from '@angular/core';

import { FilmsService } from 'src/app/services/films.service';
import { library, icon } from '@fortawesome/fontawesome-svg-core'

const camera = icon({ prefix: 'fas', iconName: 'camera' })

@Component({
  selector: 'app-container-cards',
  templateUrl: './container-cards.component.html',
  styleUrls: ['./container-cards.component.scss'],
})
export class ContainerCardsComponent implements OnInit {
  arrayFilms: any;
  filmsResult: any;
  arrayGenre: any;
  filtroGenre: any;
  nameGenre: any;
  constructor(private filmsService: FilmsService) {}

  getFilmsFromService(): any {
    this.filmsService.getFilms(1).subscribe((films) => {
      this.arrayFilms = films;
      this.filmsResult = this.arrayFilms.results.filter(
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
      this.arrayGenre = this.arrayGenre.genres;
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
