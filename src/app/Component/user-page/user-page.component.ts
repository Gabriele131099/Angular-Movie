import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})

export class UserPageComponent implements OnInit {
  arrayUsers: IUser[] = JSON.parse(localStorage.getItem('arrayUsers')||'');
  userLogFlag:any = localStorage.getItem('userLogFlag')
  user:any
  userId:number = parseInt(localStorage.getItem('userId')||'');

  wishList:any = JSON.parse(localStorage.getItem("wishList")||'')
  arrayWishlist:any = this.wishList?.list

  favourite:any = JSON.parse(localStorage.getItem("favourite")||'')
  arrayFavourites:any = this.favourite?.list

deleteWhishList(film:any){
  this.arrayWishlist = this.arrayWishlist.filter((obj:any)=>obj.id!=film?.id)
  this.wishList.list = this.arrayWishlist
  localStorage.setItem("wishList", JSON.stringify(this.wishList));
  console.log(this.wishList)
}
deleteFavourite(film:any){
  this.arrayFavourites = this.arrayFavourites.filter((obj:any)=>obj.id!=film?.id)
  this.favourite.list = this.arrayFavourites
  localStorage.setItem("favourite", JSON.stringify(this.favourite));
  console.log(this.favourite)
}
filtro:string=''
cercaFilm(arrayName:any){
  switch (arrayName) {
    case 'WishList':
      this.arrayWishlist=this.wishList.list
      this.arrayWishlist = this.arrayWishlist.filter((obj:any)=>obj.title.includes(this.filtro))

      break;   
      case 'favourite':      this.arrayFavourites = this.favourite.list
      this.arrayFavourites = this.arrayFavourites.filter((obj:any)=>obj.title.includes(this.filtro))

      break;
  }
}
cartFlag =false
cart(){
  if (this.cartFlag) {
    this.cartFlag = false
  }else{
    this.cartFlag= true
  }
  console.log(this.cartFlag)
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
