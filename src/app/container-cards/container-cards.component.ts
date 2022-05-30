import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FILMS } from 'src/film';
import { FilmsService } from 'src/films.service.ts';
@Component({
  selector: 'app-container-cards',
  templateUrl: './container-cards.component.html',
  styleUrls: ['./container-cards.component.scss']
})
export class ContainerCardsComponent implements OnInit {
  @Input() filtro=''
  arrayFilms:any = FILMS;
  arrayFilmsTmp = this.arrayFilms.filter((obj:any)=>{
    obj.Genre.includes(this.filtro)
  })
  constructor(private FilmsService: FilmsService
  ) { }
  getFilms(): void {
    
    this.FilmsService.getFilms()
        .subscribe(films => {
          this.arrayFilms = films.filter((obj:any)=>
           this.filtro=="popular" ? obj.Genre.includes("") : obj.Genre.includes(this.filtro)
          )
        });
  }
  ngOnInit(): void {
    this.getFilms()
  }
  
}


