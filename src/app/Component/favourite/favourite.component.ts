import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class Favourite implements OnInit {
 arrayFilm :any= JSON.parse(localStorage.getItem('favourite')||'')
  empty(){
    this.arrayFilm.list=[]
    localStorage.setItem('favourite',JSON.stringify(this.arrayFilm)||'')
  }
  deleteFilm(film:any){
    this.arrayFilm.list = this.arrayFilm.list.filter((obj:any)=>obj.id!=film?.id)
    localStorage.setItem('favourite',JSON.stringify(this.arrayFilm)||'')
  }
  constructor() { }
  ngOnInit(): void {
    console.log(this.arrayFilm)
    console.log(JSON.parse(localStorage.getItem('favourite')||''))
  }

}
