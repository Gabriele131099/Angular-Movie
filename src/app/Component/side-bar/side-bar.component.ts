import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
///import { IUser } from '../../Interfaces/IUser';
import { FilmsService } from 'src/app/services/films.service';
import { LANGUAGES } from 'src/assets/json/languages';
import { USERS } from '../../../assets/user';

@Component({
  selector: 'app-sideBar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  arrayUser: any[] = USERS;
  userLogFlag: any = localStorage.getItem('userLogFlag');
  userId = localStorage.getItem('userId');
  arrayGenre: any;
  arrayFilms: any;
  arrayEn: any;
  arrayFr: any;
  arraySp: any;
  arrayEnglish: any;

  user$: any = this.auth.user;

  codeNameLanguages: any[] = LANGUAGES;

  films$: any = this.filmsService.movieCollection.valueChanges();
  genres$: any = this.filmsService.genreCollection.valueChanges();

  constructor(
    private filmsService: FilmsService,
    private router: Router,
    private auth: AngularFireAuth
  ) {
    this.router = router;
  }

  getGenre(): any {
    this.filmsService.getGenre().subscribe((genre) => {
      this.arrayGenre = genre;
      console.log(this.arrayGenre);
    });
  }

  getFilms(): any {
    this.filmsService.getFilms().subscribe((film) => {
      this.arrayFilms = film;
    });
  }

  renderByGenre(id: any) {
    window.location.replace(`/archive/${id}/all`);
  }

  renderByLanguage(lang: any) {
    window.location.replace(`/archive/0/${lang}`);
  }

  logOut() {
    localStorage.setItem('uidUser', '');
    this.auth.signOut();
    this.router.navigate(['./home']);
  }

  ngOnInit(): void {
    this.getGenre();
  }
}
