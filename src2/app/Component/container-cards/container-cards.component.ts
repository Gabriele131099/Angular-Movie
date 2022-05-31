import { Component, Input, OnInit } from '@angular/core';

import { FilmsService } from 'src/app/services/films.service';
@Component({
  selector: 'app-container-cards',
  templateUrl: './container-cards.component.html',
  styleUrls: ['./container-cards.component.scss']
})
export class ContainerCardsComponent implements OnInit {

 // @Input() filtro=''

  arrayFilms:[] = this.getFilmsFromService();

/*
  arrayFilmsTmp = this.arrayFilms.filter((obj:any)=>{
    obj.Genre.includes(this.filtro)
  })*/
  constructor(private filmsService: FilmsService
  ) {    }

  getFilmsFromService(): any {
    this.filmsService.getFilms()
        .subscribe(films => {
          this.arrayFilms = films;

          console.log(this.arrayFilms)
       /*   this.arrayFilms = films.filter((obj:any)=>
           this.filtro=="popular" ? obj.Genre.includes("") : obj.Genre.includes(this.filtro)
          )*/
        });
  }

  ngOnInit(): void {
    this.getFilmsFromService()
    //console.log(this.getFilmsFromService());



  }

}


