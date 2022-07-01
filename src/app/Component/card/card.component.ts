import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FilmsService } from '../../services/films.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  film: any;
  idFilm: any = parseInt(this.route.snapshot.paramMap.get('id') || '');
  arrayGenre: any;
  userLogFlag: any = localStorage.getItem('userLogFlag');
  pathBackdrop: string = 'https://image.tmdb.org/t/p/original/';
  pathPoster: string = 'https://image.tmdb.org/t/p/original/';
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private FilmsService: FilmsService
  ) {}
  arrayRecensioni: any = [
    {
      id_user: 0,
      id_film: 0,
      recensione: 'sono di un altro film',
    },
  ];
  flag: boolean = false;
  arrayFilms: any;
  filmsResult: any;

  open() {
    if (this.flag == true) {
      this.flag = false;
    } else {
      this.flag = true;
    }
    console.log(this.flag);
  }

  arrayGenreNames: any = [];

  queryMovieById(): any {
    this.film = this.FilmsService.queryMovieById(this.idFilm).valueChanges();
    this.film = this.film.forEach((obj: any) => {
      this.film = obj[0];
      console.log(obj[0]);
    });
  }
  ngOnInit(): void {
    this.queryMovieById();
  }
}
