import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class Favourite implements OnInit {
  nameList:string=`favourite`
  title:string = this.nameList.toLocaleUpperCase()
 arrayFilm :any= JSON.parse(localStorage.getItem(`${this.nameList}`)||'')
  empty(){
    this.arrayFilm.list=[]
    localStorage.setItem(`${this.nameList}`,JSON.stringify(this.arrayFilm)||'')
  }
  deleteFilm(film:any){
    this.arrayFilm.list = this.arrayFilm.list.filter((obj:any)=>obj.id!=film?.id)
    localStorage.setItem(`${this.nameList}`,JSON.stringify(this.arrayFilm)||'')
  }
  constructor() { }
  ngOnInit(): void {
    console.log(this.arrayFilm)
    console.log(JSON.parse(localStorage.getItem(`${this.nameList}`)||''))
  }
  changeList(list:string){
    this.nameList = list
    this.arrayFilm = JSON.parse(localStorage.getItem(`${this.nameList}`)||'')
    console.log(this.arrayFilm.list)
  }
}
