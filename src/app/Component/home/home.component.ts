import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  array:any=[1,2,3,4,5,6,7,8,9,0,10,11,12,13,14,15,16,17,18,19,]
  ngOnInit(): void {
    
  }

}
