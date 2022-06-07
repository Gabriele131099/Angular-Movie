import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FILMS } from 'src/assets/film';
import {FilmsService} from '../../services/films.service'
import { Location } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  film: any;
  arrayGenre: any;
  userLogFlag:any = localStorage.getItem('userLogFlag')

  // id:any = infoFilm;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private FilmsService: FilmsService
  ) {}
  arrayRecensioni:any = [
    {
      id_user:0,
      id_film:0,
      recensione:'sono di un altro film'
    }
  ]
    flag:boolean = false
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
  recensione:any
  open(): void {
    this.flag= true
    console.log(this.film)
    this.recensione  = this.arrayRecensioni[this.posizioneRecensione]
    console.log(this.recensione)
  }
  close(){
    this.flag= false
  }
  posizioneRecensione:number = 0
  slideShowRight(){
    if (this.posizioneRecensione >= this.arrayRecensioni.length-1) {
      this.posizioneRecensione= 0
      this.recensione  = this.arrayRecensioni[this.posizioneRecensione]
    }else{
      this.posizioneRecensione++;
      this.recensione  = this.arrayRecensioni[this.posizioneRecensione]
    }
    console.log(this.posizioneRecensione)
  }
  slideShowLeft(){
    if (this.posizioneRecensione<=0) {
      this.posizioneRecensione= this.arrayRecensioni.length-1
      this.recensione  = this.arrayRecensioni[this.posizioneRecensione]
    }else{
      this.posizioneRecensione--;
      this.recensione  = this.arrayRecensioni[this.posizioneRecensione]
    }
    console.log(this.posizioneRecensione)
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
    this.arrayRecensioni = this.arrayRecensioni.filter((obj:any)=>{obj.id_film=this.film.id})
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
