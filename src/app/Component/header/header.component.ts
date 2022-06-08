import { Component, OnInit } from '@angular/core';
import { USERS } from '../../../assets/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  storage(){

    localStorage.setItem('arrayUsers',JSON.stringify(USERS)) ///storage arrayUser
    localStorage.setItem('userLogFlag', 'false');///storage log
    localStorage.setItem('userId', '0');///storage id utente in sessione

    const lista:any = {
      list:[],
      id_user:0
    }
    localStorage.setItem('wishList',JSON.stringify(lista)) ///storage wishList, per singolo utentes
    localStorage.setItem('favourite',JSON.stringify(lista)) ///storage favourite, per singolo utentes

  }
  ngOnInit(): void {
  }

}
