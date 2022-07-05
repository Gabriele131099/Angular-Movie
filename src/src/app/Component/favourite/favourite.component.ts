import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class Favourite implements OnInit {
  nameList:string=`favourite`
  title:string = this.nameList.toLocaleUpperCase()
  arrayFilm :any= JSON.parse(localStorage.getItem(`${this.nameList}`)||'')
  userId:number = parseInt(localStorage.getItem('userId')||'')
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
  form: FormGroup = new FormGroup({
   filtroTitle: new FormControl(''),
  });
  changeList(list:string){
    if (this.form.valid) {
    this.submitEM.emit(this.form.value);
    this.nameList = list
    this.title = this.nameList.toLocaleUpperCase()
    this.arrayFilm = JSON.parse(localStorage.getItem(`${this.nameList}`)||'')
    this.arrayFilm.list = this.arrayFilm.list.filter((obj:any)=>obj.title.includes(this.form.value.filtroTitle))
    }
   
}


@Output() submitEM = new EventEmitter();
}
