import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FilmsService } from '../../services/films.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  film: any;
  idFilm: any = parseInt(this.route.snapshot.paramMap.get('id') || '');
  genres$: any = this.FilmsService.genreCollection.valueChanges();
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

  open() {
    if (this.flag == true) {
      this.flag = false;
    } else {
      this.flag = true;
    }
    console.log(this.flag);
  }

  arrayGenreNames: any = [];
  arrayGenre: any;
  queryMovieById(): any {
    this.film = this.FilmsService.queryMovieById(this.idFilm).valueChanges();

    this.film.forEach((objfilm: any) => {
      this.film = objfilm[0];

      this.film?.backdrop_path == null
        ? (this.pathBackdrop =
            'https://images.ctfassets.net/x0ftt113i8ba/39GZ1TkqG293ufwBqHxeoH/eb536c271630673cc20006f6854e1b43/lego_it.png')
        : (this.pathBackdrop += this.film?.backdrop_path);

      this.film?.poster_path == null
        ? (this.pathPoster =
            'https://images.ctfassets.net/x0ftt113i8ba/39GZ1TkqG293ufwBqHxeoH/eb536c271630673cc20006f6854e1b43/lego_it.png')
        : (this.pathPoster += this.film?.poster_path);

      this.genres$.forEach((objGenre: any) => {
        this.arrayGenre = objGenre;

        this.film?.genre_ids.forEach((eleGenre: any) => {
          console.log(this.arrayGenre);

          this.arrayGenre.forEach((eleGenreName: any) => {
            if (eleGenre == eleGenreName?.id) {
              this.arrayGenreNames.push(eleGenreName.name);
            }
          });
        });
      });
    });
  }
  ngOnInit(): void {
    this.queryMovieById();
  }
}
