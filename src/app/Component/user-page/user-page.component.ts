import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
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
    private auth: AngularFireAuth,
    private angularStorage: AngularFireStorage
  ) {
    // this.auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.email = user.email;
    //     //this.selectItems(user.uid);
    //   }
    // });
  }

  tmpUid: any;

  queryUserById(id: any) {
    let user: any = (this.userCollection = this.angularFirestore.collection<
      any[]
    >('users', (ref) => ref.where('uid', '==', `${id}`)));
    return user;
  }
  displayUserData() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email;
        this.tmpUid = user.uid;

        this.user = this.queryUserById(user.uid).valueChanges();

        this.user.forEach((obj: any) => {
          console.log(obj[0]);
          this.user = obj[0];
        });

        console.log(this.user);
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
  userListsCollection: any = this.angularFirestore.collection('userList');
  fileRef: any;
  file: any;
  n: any = Date.now();
  filePath = `userCover/${this.n}`;
  form: FormGroup = new FormGroup({
    img: new FormControl(''),
  });

  async inserisciImg(event: any) {
    console.log(event.target);
    this.file = event.target.files[0];
    this.fileRef = this.angularStorage.ref(this.filePath); // salva il riferimento
    console.log(this.fileRef);

    //const task = this.userCollection.upload(`bills/${n}`, file);
    const task = this.angularStorage.upload(this.filePath, this.file);

    await task.then((data: any) => {
      this.fileRef
        .getDownloadURL()
        .toPromise()
        .then((link: any) => {
          // this.userCollection.doc(userCredential.user?.uid).set({
          this.angularFirestore
            .collection('users')
            .doc(`${this.tmpUid}`)
            .update({ image: link })
            .then(() => {
              console.log('done');
            })
            .catch(function (error) {
              console.error('Error writing document: ', error);
            });
        });
    });
  }
  ngOnInit(): void {
    this.displayUserData();
  }
}
