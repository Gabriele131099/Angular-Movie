import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FILMS } from 'src/assets/film';
import {FilmsService} from '../../services/films.service'
import { Location } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  film:any;

  // id:any = infoFilm;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private FilmsService : FilmsService
  ) { }

  arrayFilms:any
  filmsResult:any
  getFilmsFromService(): any {
    this.FilmsService.getFilms(1)
        .subscribe(films => {
          this.arrayFilms = films;
          this.filmsResult = this.arrayFilms.results;
          console.log(this.route.snapshot.paramMap.get('id'))
          this.film = this.filmsResult.filter((obj:any)=>{ return obj.id==this.route.snapshot.paramMap.get('id')})
          this.film = this.film[0]
          console.log(this.film)
          console.log(this.filmsResult)
        });
  }


  goBack(): void {
    this.location.back();
  }
    
  ngOnInit(): void {
    // this.getFilm();
    this.getFilmsFromService()
    console.log(this.film)

  }
}
