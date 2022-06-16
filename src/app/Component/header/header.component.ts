import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { USERS } from '../../../assets/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private filmsService: FilmsService,) { }
  storage(){

    localStorage.setItem('arrayUsers',JSON.stringify(USERS)) ///storage arrayUser
    localStorage.setItem('userLogFlag', 'false');///storage log
    localStorage.setItem('userId', '0');///storage id utente in sessione
    localStorage.setItem('review', JSON.stringify([]));///storage id utente in sessione
    let arrayList : any =  [
        {
        list:[],
        id_user:0
      }
    ]
    const lista:any = {
      list:[],
      id_user:0
    }
    localStorage.setItem('wishList',JSON.stringify(lista)) ///storage wishList, per singolo utentes
    localStorage.setItem('favourite',JSON.stringify(lista)) ///storage favourite, per singolo utentes
    localStorage.setItem('films',JSON.stringify(this.getFilmsFromService()))
   
  }
  getFilmsFromService() {
    this.filmsService.getFilms(0).subscribe((films) => {
      let arrayFilms:any = films;
      let filmsResult:any = arrayFilms.results
      console.log(filmsResult)
       return filmsResult;
    });
    
  }
  ngOnInit(): void {
  }

}


