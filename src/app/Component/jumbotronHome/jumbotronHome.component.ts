import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/films.service';
@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotronHome.component.html',
  styleUrls: ['./jumbotronHome.component.scss'],
})
export class JumbotronHomeComponent implements OnInit {
  arrayFilms: any;
  filmsResult: any;
  randomNumber:number = 0
  film:any 
  constructor(
    private filmsService: FilmsService,
  ) {}

  getFilmsFromService(number: number): any {
    number++;
    this.filmsService.getFilms(number).subscribe((films) => {
      this.arrayFilms = films;
      this.filmsResult = this.arrayFilms.results
      this.film = this.filmsResult[0]
    });
  }
slideShowPlus(){
  if (this.randomNumber>=19) {
    this.randomNumber= 0
    this.film =  this.filmsResult[this.randomNumber];
  }else{
    this.film =  this.filmsResult[this.randomNumber++];
  }
}
slideShowMeno(){
  if (this.randomNumber<=0) {
    this.randomNumber= 19
    this.film =  this.filmsResult[this.randomNumber];
  }else{
    this.film =  this.filmsResult[this.randomNumber--];
  }
}
  ngOnInit(): void {
    this.getFilmsFromService(1);
  }
}
