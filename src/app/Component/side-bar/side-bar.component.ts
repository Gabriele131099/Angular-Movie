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
  codeNameLanguages: any[] = [
    {
      code : "en",
      name : "Inglese",
      root : null
    },
    {
      code : "sp",
      name : "Spagnolo",
      root : null
    },
    {
      code : "fr",
      name : "Francese",
      root : null
    },
    {
      code : "sv" ,
      name : "Svedese",
      root : "European"
    },
    {
      code : "nl",
      name : "Olandese",
      root : "European"
    },
    {
      code : "pt",
      name : "Portogese",
      root : "European"
    },
    {
      code : "it",
      name : "Italiano",
      root : "European"
    },
    {
      code : "pl",
      name : "Polacco",
      root : "European"
    },
    {
      code : "da",
      name : "Danese",
      root : "European"
    },
    {
      code : "no",
      name : "Norvegese",
      root : "European"
    },
    {
      code : "fi",
      name : "Finlandese",
      root : "European"
    },
    {
      code : "ru",
      name : "Russo",
      root : "European"
    },
    {
      code : "tr",
      name : "Turco",
      root : "Asian"
    },
    {
      code : "hi",
      name : "Hindi",
      root : "Asian"
    },
    {
      code : "te",
      name : "Telugu",
      root : "Asian"
    },
    {
      code : "ml",
      name : "Malayalam",
      root : "Asian"
    },
    {
      code : "ja",
      name : "Giapponese",
      root : "Asian"
    },
    {
      code : "ko",
      name : "Coreano",
      root : "Asian"
    },
    {
      code : "zh",
      name : "Cinese",
      root : "Asian"
    },
    {
      code : "cn",
      name : "Cinese",
      root : "Asian"
    },
    {
      code : "th",
      name : "Tailandese",
      root : "Asian"
    },
    {
      code : "id",
      name : "Indonesiano",
      root : "Asian"
    }
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
    this.filmsService.getFilms()
        .subscribe(film => {
          this.arrayFilms = film;
        });
  }

  renderByGenre(id:any){
    window.location.replace(`/archive/${id}`);
  }

  renderByLanguage(lang:any){
    window.location.replace(`/archive/0/${lang}`);
  }

  logOut(){
    localStorage.setItem('userLogFlag','false')
    window.location.replace('/');
  }

  ngOnInit(): void {
    this.getGenre()
  }
}
