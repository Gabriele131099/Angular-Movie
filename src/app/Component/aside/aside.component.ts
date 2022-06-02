import { Component, OnInit } from '@angular/core';
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
 
  constructor(private filmsService: FilmsService) {    }
  arrayGenre:any
  getGenre(): any {
    this.filmsService.getGenre()
        .subscribe(genre => {
          this.arrayGenre = genre;
          this.arrayGenre = this.arrayGenre.genres;
          console.log(this.arrayGenre)
        });
  }

  ngOnInit(): void {
    this.getGenre()
  }


}
