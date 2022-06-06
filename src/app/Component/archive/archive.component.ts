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
  arrayWishList:any=[]
  arrayPreferiti:any=[]
  filtroGenre:any = this.route.snapshot.paramMap.get('id') ;
  userLogFlag:any = localStorage.getItem('userLogFlag')
  constructor(
    private filmsService: FilmsService,
    private route: ActivatedRoute
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
    let tmp = this.arrayWishList.filter((obj:any)=>obj.id==film.id)
    if (tmp.length>0) {
      alert('il film esiste già nella ')
    }else if(this.userLogFlag=='true'){
      this.arrayWishList.push(film)
      const wishList = {
        wishList:this.arrayWishList,
        id_user:0
      }
      localStorage.setItem("wishList", JSON.stringify(wishList));
      alert('aggiunto con successo')
    }else{
      alert('devi prima loggarti')
    }
    //console.log(JSON.parse(localStorage.getItem("wishList")))
  }

  getFilmsFromService(number: number): any {
    number++;
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
  ngOnInit(): void {
    
    this.getFilmsFromService(this.pageIndex);
    this.getGenre()
  }
}
