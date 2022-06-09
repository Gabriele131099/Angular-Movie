import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/IUser';
import { FilmsService } from 'src/app/services/films.service';
import { USERS } from '../../../assets/user';


@Component({
  selector: 'app-sideBar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  arrayUser :IUser[ ] = USERS
  userLogFlag:any = localStorage.getItem('userLogFlag')
  userId = localStorage.getItem('userId');

  constructor(private filmsService: FilmsService,
    private route: Router) {    }
  arrayGenre:any
  getGenre(): any {
    this.filmsService.getGenre()
        .subscribe(genre => {
          this.arrayGenre = genre;
          this.arrayGenre = this.arrayGenre.genres;
          console.log(this.arrayGenre)
        });
  }
  logOut(){
    localStorage.setItem('userLogFlag','false')
    window.location.replace('/');
  }
  render(id:any){
    window.location.replace(`/archive/${id}`);
  }
  ngOnInit(): void {

    this.getGenre()

  }





}
