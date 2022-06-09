import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class Favourite implements OnInit {
  @Input() arrayFilm :any
  empty(){
    this.arrayFilm=[]
  }
  deleteFilm(film:any){
    this.arrayFilm = this.arrayFilm.filter((obj:any)=>obj.id!=film?.id)
  }
  constructor() { }
  ngOnInit(): void {
  }

}
