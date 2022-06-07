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
  posizione:number = 0
  film:any
  constructor(
    private filmsService: FilmsService,
  ) {}

  getFilmsFromService(): any {

    //number++; - martina 06-06 gettrendingfilms metodo

    this.filmsService.getTrendingFilms().subscribe((films) => {

      this.arrayFilms = films;

      this.filmsResult = this.arrayFilms.results

      this.film = this.filmsResult[this.posizione]

    });

    console.log(this.filmsResult)

  }

  slideShowRight(){

    if (this.posizione >= this.filmsResult.length-1) {

      this.posizione= 0

      this.film  = this.filmsResult[this.posizione]

    }else{

      this.posizione++;

      this.film  = this.filmsResult[this.posizione]

    }

    console.log(this.posizione)

  }
  slideShowLeft(){

    if (this.posizione<=0) {

      this.posizione= this.filmsResult.length-1

      this.film  = this.filmsResult[this.posizione]

    }else{

      this.posizione--;

      this.film  = this.filmsResult[this.posizione]

    }

    console.log(this.posizione)

  }

  ngOnInit(): void {

    this.getFilmsFromService();
    setInterval(() => {
      this.slideShowRight()
    },5000);

  }
}
