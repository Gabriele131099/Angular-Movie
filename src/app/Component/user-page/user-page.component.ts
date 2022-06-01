import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Interfaces/IUser';
import { USERS } from 'src/assets/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  arrayUsers: IUser[] = USERS;

  constructor() { }

  ngOnInit(): void {
    console.log(this.arrayUsers)
  }

}
