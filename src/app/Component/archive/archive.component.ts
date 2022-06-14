import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/films.service';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  arrayFilms: any;
  filmsResult: any;
  filtroTitle: string = '';

  arrayWishList:any=JSON.parse(localStorage.getItem('wishList')||'');
  arrayFavourite:any=JSON.parse(localStorage.getItem('favourite')||'');

  filtroGenre:any = this.route.snapshot.paramMap.get('id');
  
  userLogFlag:any = localStorage.getItem('userLogFlag');
  message:string = ''
  constructor(
    private filmsService: FilmsService,
    private route: ActivatedRoute,
  ) {}



  itemsPerPageLabel: string = '';
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

  addFilmWishList(film:any){
    this.message = ''
    let tmp = this.arrayWishList.list.filter((obj:any)=>obj.id==film.id)
    if (tmp.length>0) {
      this.message = 'il film esiste già nella '
    }else if(this.userLogFlag=='true'){
      this.arrayWishList.list.push(film)
      localStorage.setItem("wishList", JSON.stringify(this.arrayWishList));
      this.message = 'aggiunto con successo'
    }else{
      this.message = 'devi prima loggarti'
    }
  }

  addFilmFavourites(film:any){
    this.message = ''
    let tmp = this.arrayFavourite.list.filter((obj:any)=>obj.id==film.id)
    if (tmp.length>0) {
      this.message = 'gentilissimo signore, guardi che lei ha gia inserito codesto film'
    } else if (this.userLogFlag=='true') {
      this.arrayFavourite.list.push(film)
      localStorage.setItem('favourite',JSON.stringify(this.arrayFavourite))
      this.message = 'messere il suo film è stato deposto all interno della lista'
    }else{
      this.message = 'devi prima loggarti'
    }
  }

  getFilmsFromService(number: number): any {
    this.filmsService.getFilms(number).subscribe((films) => {
      this.arrayFilms = films;
      this.filmsResult = this.arrayFilms.results.filter((obj: any) =>
      obj.original_title.includes(this.filtroTitle) &&
      (obj.genre_ids.filter(
        (ele: any) => ele == this.filtroGenre
        ).length>0 ||
        this.filtroGenre==0)
        );
        console.log(this.filmsResult);
      });
      number++;
    console.log(this.filtroTitle);
  }
  arrayGenre:any
  getGenre(): any {
    this.filmsService.getGenre()
        .subscribe(genre => {
          this.arrayGenre = genre;
          this.arrayGenre = this.arrayGenre.genres;
          console.log(this.arrayGenre)
        });
  }
  flag:boolean = false
  openList(){
    if(this.flag){
      this.flag= false
    }else{
      this.flag = true
    }
  }
  ngOnInit(): void {

    this.getFilmsFromService(this.pageIndex);
    this.getGenre()
  }
}
