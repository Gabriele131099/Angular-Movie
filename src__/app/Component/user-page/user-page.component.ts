import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FilmsService } from 'src/app/services/films.service';
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

  // userCollection: any = this.angularFirestore.collection('users');
  username: any;
  email: any;
  birthDay: any;
  gender: any;
  // user$: Observable<IUser | null> = this.auth.user;
  userAuth$: any = this.auth.user;
  films$: any = this.filmsService.movieCollection.valueChanges();
  genres$: any = this.filmsService.genreCollection.valueChanges();

  userCollection: any = this.angularFirestore.collection('users');
  users$: any = this.userCollection.valueChanges();

  constructor(
    private route: ActivatedRoute,
    private angularFirestore: AngularFirestore,
    private filmsService: FilmsService,
    private auth: AngularFireAuth
  ) {
    // this.auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.email = user.email;
    //     //this.selectItems(user.uid);
    //   }
    // });
  }

  tmpUid: any;

  displayUserData() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email;
        this.tmpUid = user.uid;

        // this.userCollection = this.angularFirestore.collection<any[]>(
        //   'users',
        //   (ref) => ref.where('uid', '==', `${this.tmpUid}`)
        // );

        //doc(uid).get() prende dalla collection il documento la cui pk è l'uid dell'utente auth
        this.userCollection
          .doc(this.userAuth$.uid)
          .get()
          .then((doc: any) => {
            console.log(doc.data().username, 'AO');

            this.email = this.userAuth$.email;
            this.username = doc.data().username;
            this.gender = doc.data().gender;

            let splitDate = doc.data().date.split('');
            this.birthDay =
              splitDate[0] +
              ' ' +
              splitDate[1] +
              ' ' +
              splitDate[2] +
              ' ' +
              splitDate[3];
            console.log(this.email);
            console.log(this.username);
          });
        // this.selectItems(user.uid);
      }
    });
  }

  // gestione Liste dell'utente:
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
    this.displayUserData();
    // this.user$ = this.userCollection.valueChanges();
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
