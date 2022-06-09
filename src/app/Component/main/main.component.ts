import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  constructor() { }
  cartFlag =false
cart(){
  if (this.cartFlag) {
    this.cartFlag = false
  }else{
    this.cartFlag= true
  }
  console.log(this.cartFlag)
}
 userFlag:any=localStorage.getItem('userLogFlag');///storage log

  ngOnInit(): void {
   
  }

}
