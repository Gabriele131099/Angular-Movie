import { Component, OnInit } from '@angular/core';
import { FILMS } from 'src/assets/film';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  arrayFilms:any = FILMS;

  constructor() { }

  ngOnInit(): void {
  }

}
