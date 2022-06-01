import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  arrayFilms: any;
  filmsResult: any;
  itemsPerPageLabel: string=''
  constructor(private filmsService: FilmsService) {}
  filtro: string = '';

  length = 500;
  pageSize = 1;
  pageIndex = 1;
  pageSizeOptions = [1];
  showFirstLastButtons = true;
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    console.log(this.pageIndex);
    this.filmsService.numberPage = this.pageIndex * this.pageSize;
    this.getFilmsFromService(this.pageIndex);
  }
  getFilmsFromService(number: number): any {
    number++;
    this.filmsService.getFilms(number).subscribe((films) => {
      this.arrayFilms = films;
      this.filmsResult = this.arrayFilms.results.filter((obj: any) =>
        obj.original_title.includes(this.filtro)
      );
      console.log(this.filmsResult);
    });
    console.log(this.filtro);
  }

  ngOnInit(): void {
    this.getFilmsFromService(this.pageIndex);
  }
}
