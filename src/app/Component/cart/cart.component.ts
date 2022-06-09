import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class Cart implements OnInit {
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
