import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FILMS } from 'src/assets/film';
import { FilmsService } from '../../services/films.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  film: any;
  arrayGenre: any;

  // id:any = infoFilm;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private FilmsService: FilmsService
  ) {}

  arrayFilms: any;
  filmsResult: any;
  getFilmsFromService(): any {
    this.FilmsService.getFilms(1).subscribe((films) => {
      this.arrayFilms = films;
      this.filmsResult = this.arrayFilms.results;
      console.log(this.route.snapshot.paramMap.get('id'));
      this.film = this.filmsResult.filter((obj: any) => {
        return obj.id == this.route.snapshot.paramMap.get('id');
      });
      this.film = this.film[0];
      console.log(this.film);
      console.log(this.filmsResult);
    });
  }

  getGenre(): any {
    this.FilmsService.getGenre().subscribe((genre) => {
      this.arrayGenre = genre;
      this.arrayGenre = this.arrayGenre.genres;
      console.log(this.arrayGenre);
    });
  }
  goBack(): void {
    this.location.back();
  }
  arrayGenreNames:any=[]
  getGenreNames() {
    console.log(this.film)
    this.film.genre_ids.forEach((obj:any) => {
      console.log(obj)
      this.arrayGenre.forEach((ele:any) => {
        if (obj==ele.id) {
          this.arrayGenreNames.push(ele.name)
        } 
      });
    });
    console.log(this.arrayGenreNames)
  }
  ngOnInit(): void {
    // this.getFilm();
    this.getFilmsFromService();
    this.getGenre();
    setTimeout(() => { this.getGenreNames() }, 1000);
    console.log(this.film);
  }
}
