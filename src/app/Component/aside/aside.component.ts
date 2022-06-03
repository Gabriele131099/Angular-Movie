import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/Interfaces/IUser';
import { FilmsService } from 'src/app/services/films.service';
import { USERS } from '../../../assets/user'
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
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

  }
  ngOnInit(): void {
    
    this.getGenre()
  }


}
