import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../Interfaces/IUser';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  arrayUsers: IUser[] = JSON.parse(localStorage.getItem('arrayUsers') || '');
  userLogFlag: any = localStorage.getItem('userLogFlag');
  user: any;
  userId: number = parseInt(localStorage.getItem('userId') || '');
  born: any;
  wishList: any = JSON.parse(localStorage.getItem('wishList') || '');
  arrayWishlist: any = this.wishList?.list;

  favourite: any = JSON.parse(localStorage.getItem('favourite') || '');
  arrayFavourites: any = this.favourite?.list;

  userCollection: any = this.angularFirestore.collection('users');
  user$: any;

  constructor(
    private route: ActivatedRoute,
    private angularFirestore: AngularFirestore
  ) {}

  deleteWhishList(film: any) {
    this.arrayWishlist = this.arrayWishlist.filter(
      (obj: any) => obj.id != film?.id
    );
    this.wishList.list = this.arrayWishlist;
    localStorage.setItem('wishList', JSON.stringify(this.wishList));
    console.log(this.wishList);
  }
  deleteFavourite(film: any) {
    this.arrayFavourites = this.arrayFavourites.filter(
      (obj: any) => obj.id != film?.id
    );
    this.favourite.list = this.arrayFavourites;
    localStorage.setItem('favourite', JSON.stringify(this.favourite));
    console.log(this.favourite);
  }
  filtro: string = '';
  cercaFilm(arrayName: any) {
    switch (arrayName) {
      case 'WishList':
        this.arrayWishlist = this.wishList.list;
        this.arrayWishlist = this.arrayWishlist.filter((obj: any) =>
          obj.title.includes(this.filtro)
        );

        break;
      case 'favourite':
        this.arrayFavourites = this.favourite.list;
        this.arrayFavourites = this.arrayFavourites.filter((obj: any) =>
          obj.title.includes(this.filtro)
        );

        break;
    }
  }

  ngOnInit(): void {
    this.user$ = this.userCollection.valueChanges();
    // const id= this.route.snapshot.paramMap.get('id')
    // if (id==this.userId.toString()) {
    //   this.user  = this.arrayUsers.filter((obj:any)=>
    //   obj.id==this.userId
    //   )[0]
    // this.born = this.user.date.split(' ')
    // this.born = this.born[0] + ' ' + this.born[1] + ' ' + this.born[2] + ' ' + this.born[3]
    // console.log(this.born)
    // console.log(this.user)
    // console.log(this.wishList)
    // }else{
    //   alert('sei un furbetto')
    //   location.href = `./user/${this.userId}`
    // }
  }
}
