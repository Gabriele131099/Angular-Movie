import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  flag:boolean = true
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
open(){
  if (this.flag==true) {
    this.flag=false
  }else{
    this.flag=true
  }
  console.log(this.flag)
}
  getGenre(): any {
    this.FilmsService.getGenre().subscribe((genre) => {
      this.arrayGenre = genre;
      this.arrayGenre = this.arrayGenre.genres;
      console.log(this.arrayGenre);
    });
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
