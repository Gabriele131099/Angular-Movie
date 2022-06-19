import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/films.service';
import { ChangeDetectionStrategy } from '@angular/core';

/** @title Virtual scroll with view recycling disabled. */

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveComponent implements OnInit {
  arrayFilms: any;
  filmsResult: any = Array.from({ length: 1439 }).map((obj: any) => {
    obj;
  });
  filtroTitle: string = '';
  filtroGenre: any = this.route.snapshot.paramMap.get('id');
  userLogFlag: any = localStorage.getItem('userLogFlag');
  message: string = '';
  constructor(
    private filmsService: FilmsService,
    private route: ActivatedRoute
  ) {}

  languageFilter: any = this.route.snapshot.paramMap.get('lang');
  codeNameLanguages: any[] = [
    {
      code: 'en',
      name: 'Inglese',
      root: 'European',
    },
    {
      code: 'sp',
      name: 'Spagnolo',
      root: 'European',
    },
    {
      code: 'fr',
      name: 'Francese',
      root: 'European',
    },
    {
      code: 'sv',
      name: 'Svedese',
      root: 'European',
    },
    {
      code: 'nl',
      name: 'Olandese',
      root: 'European',
    },
    {
      code: 'pt',
      name: 'Portogese',
      root: 'European',
    },
    {
      code: 'it',
      name: 'Italiano',
      root: 'European',
    },
    {
      code: 'pl',
      name: 'Polacco',
      root: 'European',
    },
    {
      code: 'da',
      name: 'Danese',
      root: 'European',
    },
    {
      code: 'no',
      name: 'Norvegese',
      root: 'European',
    },
    {
      code: 'fi',
      name: 'Finlandese',
      root: 'European',
    },
    {
      code: 'ru',
      name: 'Russo',
      root: 'European',
    },
    {
      code: 'tr',
      name: 'Turco',
      root: 'Asian',
    },
    {
      code: 'hi',
      name: 'Hindi',
      root: 'Asian',
    },
    {
      code: 'te',
      name: 'Telugu',
      root: 'Asian',
    },
    {
      code: 'ml',
      name: 'Malayalam',
      root: 'Asian',
    },
    {
      code: 'ja',
      name: 'Giapponese',
      root: 'Asian',
    },
    {
      code: 'ko',
      name: 'Coreano',
      root: 'Asian',
    },
    {
      code: 'zh',
      name: 'Cinese',
      root: 'Asian',
    },
    {
      code: 'cn',
      name: 'Cinese',
      root: 'Asian',
    },
    {
      code: 'th',
      name: 'Tailandese',
      root: 'Asian',
    },
    {
      code: 'id',
      name: 'Indonesiano',
      root: 'Asian',
    },
  ];

  ///////

  addList(film: any, listName: string) {
    this.message = '';
    console.log(listName);
    let array: any = JSON.parse(localStorage.getItem(`${listName}`) || '');
    console.log(array);
    let tmp = array.list.filter((obj: any) => obj.id == film.id);
    if (tmp.length > 0) {
      this.message = 'il film esiste già nella lista ' + listName;
    } else if (this.userLogFlag == 'true') {
      array.list.push(film);
      localStorage.setItem(`${listName}`, JSON.stringify(array));
      this.message = 'aggiunto con successo nella lista' + listName;
    } else {
      this.message = 'devi prima loggarti ';
    }
  }

pathPoster:string= 'https://image.tmdb.org/t/p/original/'
  arrayFiltroGenre: any = [];
  arrayGenre: any = [];
  reset(){
    this.filmsService.getFilms().subscribe((films) => {
      this.filtroGenre=0
      this.filtroTitle=''
      this.languageFilter='all'
      this.arrayFiltroGenre=[]
      this.filmsResult = films;
    });
  }
  getFilmsFromService(): any {
    this.filmsService.getFilms().subscribe((films) => {
      this.arrayFilms = films;
      this.filmsResult = this.arrayFilms.filter((obj:any)=>(obj.genre_ids.filter((element: any) => element == this.filtroGenre).length >0 || this.filtroGenre==0) &&
       (obj.original_language==this.languageFilter || this.languageFilter == 'all')
       &&
       (obj.title.includes(this.filtroTitle) || this.filtroTitle == ''))
      for (let index = 0; index < this.arrayFiltroGenre.length; index++) {
        const ele = this.arrayFiltroGenre[index];
        this.filteredForGenre(ele.id)
      }
    });
   
  }

  getGenre(): any {
    this.filmsService.getGenre().subscribe((genre) => {
      this.arrayGenre = genre;
    });
  }

  flag: boolean = false;
  openList() {
    if (this.flag) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }

  addFilteredGenre(newChips:any){
   newChips = this.arrayGenre.filter((obj:any)=>obj.id==newChips)[0]
    this.addChips(newChips)
    this.filteredForGenre(newChips.id)
  }
  filteredForGenre(newChips:any){
    this.filmsResult = this.filmsResult.filter((obj: any) =>
    obj.genre_ids.filter((element: any) => element == newChips).length >0 ||
    (this.filtroGenre == 0 ));
  }
  addChips(newChips:any) {
    this.arrayFiltroGenre.push(newChips); 
  }
  deleteChips(newChips:any){
    this.arrayFiltroGenre = this.arrayFiltroGenre.filter((obj:any)=>obj.id!=parseFloat(newChips))
    if (this.arrayFiltroGenre.length>0) {  
      this.getFilmsFromService()
      console.log(this.arrayFiltroGenre.length)
    }else{
      this.reset()
    }
  }
  
  ngOnInit(): void {
    this.getFilmsFromService();
    this.getGenre();
  }
}
