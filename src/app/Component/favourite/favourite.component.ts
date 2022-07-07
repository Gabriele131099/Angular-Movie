import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { FilmsService } from 'src/app/services/films.service';
import { doc, deleteDoc, getFirestore } from 'firebase/firestore';
import { IMovie } from 'src/app/Interfaces/IMovies';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class Favourite implements OnInit {
  nameList: string = `favourite`;
  title: string = this.nameList.toLocaleUpperCase();
  arrayFilm: any;
  userListsCollection: any = this.angularFirestore.collection(
    `${this.nameList}`
  );

  @Input() username: any;
  lists: any = this.queryUserListsById();

  queryUserListsById() {
    let lists: any = (this.userListsCollection =
      this.angularFirestore.collection<any[]>(`${this.nameList}`, (ref) =>
        ref.where('user', '==', `filippo`)
      ));
    lists.valueChanges().forEach((obj: any) => {
      console.log(obj);
    });
    return lists.valueChanges();
  }

  async empty(film: any) {
    const db = getFirestore();
    console.log(film);
    await deleteDoc(doc(db, `favourite`, '828853'));
  }
  deleteFilm(film: any) {}
  constructor(
    private angularFirestore: AngularFirestore,
    private filmsService: FilmsService,
    private auth: AngularFireAuth
  ) {}
  ngOnInit(): void {
    this.arrayFilm = this.queryUserListsById();
    this.arrayFilm.forEach((obj: any) => {
      this.arrayFilm = obj;
    });
  }
  form: FormGroup = new FormGroup({
    filtroTitle: new FormControl(''),
  });
  changeList(list: string) {
    console.log(this.username);
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      this.nameList = list;
      this.arrayFilm = this.queryUserListsById();
      this.arrayFilm.forEach((obj: any) => {
        this.arrayFilm = obj;
      });
      this.title = this.nameList.toLocaleUpperCase();
    }
  }

  @Output() submitEM = new EventEmitter();
}
