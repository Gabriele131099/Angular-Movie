import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/IUser';
import { FilmsService } from 'src/app/services/films.service';
import { USERS } from '../../../assets/user';


@Component({
  selector: 'app-sideBar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  arrayUser :IUser[ ] = USERS
  userLogFlag:any = localStorage.getItem('userLogFlag')
  userId = localStorage.getItem('userId');


  arrayGenre:any;
  arrayFilms:any;
  arrayEn: any;
  arrayFr: any;
  arraySp: any;
  arrayEnglish: any;
  arrayNamesEuropeanLanguages: any[] = [
    {"sv" : "Svedese"},
    {"nl" : "Olandese"},
    {"pt" : "Portogese"},
    {"it" : "Italiano"},
    {"pl" : "Polacco"},
    {"da" : "Danese"},
    {"no" : "Norvegese"},
    {"fi" : "Finlandese"}
  ];

  arrayNamesAsianLanguages: any[] = [
    {"ru" : "Russo"},
    {"tr" : "Turco"},
    {"hi" : "Hindi"},
    {"te" : "Telugu"},
    {"ml" : "Malayalam"},
    {"ja" : "Giapponese"},
    {"ko" : "Coreano"},
    {"zh" : "Cinese"},
    {"cn" : "Cinese"},
    {"th" : "Tailandese"},
    {"id" : "Indonesiano"}
  ];

  constructor(private filmsService: FilmsService,
    private route: Router) {  }


  getGenre(): any {
    this.filmsService.getGenre()
        .subscribe(genre => {
          this.arrayGenre = genre;
          console.log(this.arrayGenre)
        });
  }

  getFilms(): any {
    this.filmsService.getFilms(2)
        .subscribe(film => {
          this.arrayFilms = film;
        });
  }



  renderByGenre(id:any){
    window.location.replace(`/archive/${id}`);
  }

  renderByLanguage(){

  }

  logOut(){
    localStorage.setItem('userLogFlag','false')
    window.location.replace('/');
  }

  ngOnInit(): void {
    this.getGenre()
  }
}
