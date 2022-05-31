import { Component, Input, OnInit } from '@angular/core';

import { FilmsService } from 'src/app/services/films.service';
@Component({
  selector: 'app-container-cards',
  templateUrl: './container-cards.component.html',
  styleUrls: ['./container-cards.component.scss']
})
export class ContainerCardsComponent implements OnInit {


  arrayFilms:any 
  filmsResult:any
  constructor(private filmsService: FilmsService
  ) {    }

  getFilmsFromService(): any {
    this.filmsService.getFilms(1)
        .subscribe(films => {
          this.arrayFilms = films;
          this.filmsResult = this.arrayFilms.results;
          console.log(this.filmsResult)
        });
  }

  ngOnInit(): void {
    this.getFilmsFromService()
  }

}


