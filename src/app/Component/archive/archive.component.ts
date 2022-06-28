import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/films.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { LANGUAGES } from 'src/assets/json/languages';

/** @title Virtual scroll with view recycling disabled. */

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveComponent implements OnInit {
  // arrayFilms: any;
  // filmsResult: any = Array.from({ length: 1439 }).map((obj: any) => {
  //   obj;
  // });
  filtroTitle: string = '';
  filtroGenre: any = this.route.snapshot.paramMap.get('id');
  userLogFlag: any = localStorage.getItem('userLogFlag');
  message: string = '';

  languageFilter: any = this.route.snapshot.paramMap.get('lang');
  codeNameLanguages: any[] = LANGUAGES;

  pathPoster: string = 'https://image.tmdb.org/t/p/original/';
  arrayFiltroGenre: any = [];
  arrayGenre: any = [];

  films$: any = this.filmsService.movieCollection.valueChanges();
  genre$: any = this.filmsService.genreCollection.valueChanges();
  filteredFilms$: any;

  constructor(
    private filmsService: FilmsService,
    private route: ActivatedRoute
  ) {}
  // postGenresFomFile(): any {
  //   this.filmsService.postGenresFomFile();
  // }
  // postMoviesFomFile(): any {
  //   this.filmsService.postMoviesFomFile();
  // }
  queryMoviesByInput(): any {
    this.films$ = this.filmsService
      .queryMoviesByInput(this.filtroTitle)
      .valueChanges();
    console.log(this.films$);
    this.films$.forEach((obj: any) => {
      console.log(obj);
    });
  }

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

  reset() {
    this.filtroGenre = 0;
    this.filtroTitle = '';
    this.languageFilter = 'all';
    this.arrayFiltroGenre = [];
    this.films$ = this.filmsService.movieCollection.valueChanges();
  }

  // getFilmsFromService(): any {
  //   this.filmsService.getFilms().subscribe((films) => {
  //     this.arrayFilms = films;
  //     this.filmsResult = this.arrayFilms.filter(
  //       (obj: any) =>
  //         (obj.genre_ids.filter((element: any) => element == this.filtroGenre)
  //           .length > 0 ||
  //           this.filtroGenre == 0) &&
  //         (obj.original_language == this.languageFilter ||
  //           this.languageFilter == 'all') &&
  //         (obj.title.includes(this.filtroTitle) || this.filtroTitle == '')
  //     );
  //     for (let index = 0; index < this.arrayFiltroGenre.length; index++) {
  //       const ele = this.arrayFiltroGenre[index];
  //       this.filteredForGenre(ele.id);
  //     }
  //   });
  // }

  // getGenre(): any {
  //   this.filmsService.getGenre().subscribe((genre) => {
  //     this.arrayGenre = genre;
  //   });
  // }

  flag: boolean = false;
  openList() {
    if (this.flag) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }

  addFilteredGenre(newChips: any) {
    newChips = this.arrayGenre.filter((obj: any) => obj.id == newChips)[0];
    this.addChips(newChips);
    // this.filteredForGenre(newChips.id);
  }
  // filteredForGenre(newChips: any) {
  //   this.films$ = this.films$.filter(
  //     (obj: any) =>
  //       obj.genre_ids.filter((element: any) => element == newChips).length >
  //         0 || this.filtroGenre == 0
  //   );
  // }
  addChips(newChips: any) {
    this.arrayFiltroGenre.push(newChips);
  }
  deleteChips(newChips: any) {
    this.arrayFiltroGenre = this.arrayFiltroGenre.filter(
      (obj: any) => obj.id != parseFloat(newChips)
    );
    if (this.arrayFiltroGenre.length > 0) {
      this.films$ = this.filmsService.movieCollection.valueChanges();
      console.log(this.arrayFiltroGenre.length);
    } else {
      this.reset();
    }
  }

  ngOnInit(): void {
    this.genre$ = this.filmsService.genreCollection.valueChanges();
    this.genre$.forEach((obj: any) => {
      this.arrayGenre = obj;
    });
  }
}
