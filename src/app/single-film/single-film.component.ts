import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from '../Interfaces/IMovies';

@Component({
  selector: 'app-single-film',
  templateUrl: './single-film.component.html',
  styleUrls: ['./single-film.component.scss'],
})
export class SingleFilmComponent implements OnInit {
  pathPoster: string = 'https://image.tmdb.org/t/p/original/';
  message: string = '';
  userLogFlag: any;
  constructor() {}
  @Input() film: any;
  addList(film: any, listName: string) {
    this.message = '';
    console.log(listName);
    let array: any = JSON.parse(localStorage.getItem(`${listName}`) || '');
    console.log(array);
    let tmp = array.list.filter((obj: any) => obj.id == film.id);
    if (tmp.length > 0) {
      this.message = 'il film esiste già nella lista ' + listName;
    } else if (this.userLogFlag == 'true') {
      array.list.push(film);
      localStorage.setItem(`${listName}`, JSON.stringify(array));
      this.message = 'aggiunto con successo nella lista' + listName;
    } else {
      this.message = 'devi prima loggarti ';
    }
  }

  arrayFiltroGenre: any = [];
  arrayGenre: any = [];
  reset() {
    // this.filmsService.getFilms().subscribe((films) => {
    //   this.filtroGenre = 0;
    //   this.filtroTitle = '';
    //   this.languageFilter = 'all';
    //   this.arrayFiltroGenre = [];
    //   this.filmsResult = films;
    // });
  }
  ngOnInit(): void {}
}
