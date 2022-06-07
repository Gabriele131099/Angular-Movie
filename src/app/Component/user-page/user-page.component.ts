import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/Interfaces/IUser';
import { FilmsService } from 'src/app/services/films.service';
import { USERS } from 'src/assets/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})

export class UserPageComponent implements OnInit {
  arrayUsers: IUser[] = USERS;
  userLogFlag:any = localStorage.getItem('userLogFlag')
  user:any
  wishList:any = localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")||'') : null
  arrayWishlist:any = this.wishList?.list

delete(film:any){
  this.wishList = this.wishList.filter((obj:any)=>obj.id!=film?.id)
  localStorage.setItem("wishList", JSON.stringify(this.wishList));
  console.log(this.wishList)
}

constructor(
  private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    const id= this.route.snapshot.paramMap.get('id')
    this.user  = this.arrayUsers.filter((obj:any)=>
      obj.id==id
    )
    console.log(this.user)
    console.log(this.wishList)
  }

}
