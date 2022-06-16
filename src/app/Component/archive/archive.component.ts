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
  filtroGenre:any = this.route.snapshot.paramMap.get('id');
  
  userLogFlag:any = localStorage.getItem('userLogFlag');
  message:string = ''
  constructor(
    private filmsService: FilmsService,
    private route: ActivatedRoute,
  ) {}




  addList(film:any,listName:string){
    this.message = ''
    console.log(listName)
    let array:any=JSON.parse(localStorage.getItem(`${listName}`)||'');
    console.log(array)
     let tmp = array.list.filter((obj:any)=>obj.id==film.id)
    if (tmp.length>0) {
      this.message = 'il film esiste già nella lista '+ listName
    }else if(this.userLogFlag=='true'){
      array.list.push(film)
      localStorage.setItem(`${listName}`, JSON.stringify(array));
      this.message = 'aggiunto con successo nella lista' + listName
    }else{
      this.message = 'devi prima loggarti '
    }
  }

  getFilmsFromService(number: number): any {
    this.filmsService.getFilms(number).subscribe((films) => {
      this.arrayFilms = films;
      this.filmsResult = this.arrayFilms.filter((obj: any) =>
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
    this.getFilmsFromService(1);
    this.getGenre()
  }
}
