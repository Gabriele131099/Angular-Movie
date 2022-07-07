import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/films.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { LANGUAGES } from 'src/assets/json/languages';
import { map } from 'rxjs';

/** @title Virtual scroll with view recycling disabled. */

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveComponent implements OnInit {
  filtroTitle: string = '';
  filtroGenre: any = this.route.snapshot.paramMap.get('id');
  userLogFlag: any = localStorage.getItem('userLogFlag');
  message: string = '';

  languageFilter: any = this.route.snapshot.paramMap.get('lang');
  codeNameLanguages: any[] = LANGUAGES;

  pathPoster: string = 'https://image.tmdb.org/t/p/original/';
  arrayFiltroGenre: any = [];
  arrayGenre: any = [];

  films$: any = this.filmsService.movieCollection.snapshotChanges().pipe(
    map((snapshots: any) => {
      return snapshots.map((s: any) => {
        // if you log s here, you can look through the object
        // payload.doc.data() should be the same as what valueChanges returns
        // payload.doc.id will be the id
        // merge them into a new object
        console.log(s.payload.doc.id);
        return { ...s.payload.doc.data(), uid: s.payload.doc.id };
      });
    })
  );
  genres$: any = this.filmsService.genreCollection.valueChanges();

  constructor(
    private filmsService: FilmsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.genres$.forEach((obj: any) => {
      this.arrayGenre = obj;
    });
  }
  // postGenresFomFile(): any {
  //   this.filmsService.postGenresFomFile();
  // }
  // postMoviesFomFile(): any {
  //   this.filmsService.postMoviesFomFile();
  // }
  queryMoviesByInput(): any {
    this.films$ = this.filmsService
      .queryMoviesByInput(
        this.filtroTitle,
        this.languageFilter,
        this.arrayFiltroGenre
      )
      .valueChanges();
    console.log(this.films$);
    this.films$.forEach((obj: any) => {
      console.log(obj);
    });
  }

  reset() {
    this.filtroGenre = 0;
    this.filtroTitle = '';
    this.languageFilter = 'all';
    this.arrayFiltroGenre = [];
    this.films$ = this.filmsService.movieCollection.valueChanges();
  }

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
    console.log(newChips);
  }

  addChips(newChips: any) {
    this.arrayFiltroGenre.push(newChips);
    console.log(newChips);
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
}
