import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FILMS } from 'src/assets/film';
import {FilmsService} from '../../../films.service'
import { Location } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  arrayFilm= FILMS
  film: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private FilmsService : FilmsService
  ) { }

  ngOnInit(): void {
    this.getFilm();
  }

  getFilm(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.FilmsService.getFilm(id)
      .subscribe((film: any) => this.film = film);
  }

  goBack(): void {
    this.location.back();
  }
}
