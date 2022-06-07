import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { library, icon } from '@fortawesome/fontawesome-svg-core'

const camera = icon({ prefix: 'fas', iconName: 'camera' })

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron-home.component.html',
  styleUrls: ['./jumbotron-home.component.scss'],
})
export class JumbotronHomeComponent implements OnInit {
  arrayFilms: any;
  filmsResult: any;
  randomNumber:number = 0
  film:any
  constructor(
    private filmsService: FilmsService,
  ) {}

  getFilmsFromService(): any {
    //number++; - martina 06-06 gettrendingfilms metodo
    this.filmsService.getTrendingFilms().subscribe((films) => {
      this.arrayFilms = films;
      this.filmsResult = this.arrayFilms.results
      this.film = this.filmsResult[0]
    });
  }
  slideShowRight(){
  if (this.randomNumber>=19) {
    this.randomNumber= 0
    this.film =  this.filmsResult[this.randomNumber];
  }else{
    this.film =  this.filmsResult[this.randomNumber++];
  }
}
slideShowLeft(){
  if (this.randomNumber<=0) {
    this.randomNumber= 19
    this.film =  this.filmsResult[this.randomNumber];
  }else{
    this.film =  this.filmsResult[this.randomNumber--];
  }
}
  ngOnInit(): void {
    this.getFilmsFromService();
  }
}
