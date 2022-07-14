import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { FilmsService } from 'src/app/services/films.service';
import { IMovie } from 'src/app/Interfaces/IMovies';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class Favourite implements OnInit {
  @Input() username: any;
  form: FormGroup = new FormGroup({
    filtroTitle: new FormControl(''),
  });
  uid: any;
  nameList: string = `favourite`;
  title: string = this.nameList.toLocaleUpperCase();
  arrayFilm: any;
  userListsCollection: any = this.angularFirestore.collection(
    `${this.nameList}`
  );
  testDoc: any;
  constructor(
    private angularFirestore: AngularFirestore,
    private filmsService: FilmsService,
    private auth: AngularFireAuth
  ) {}
  ngOnInit(): void {
    this.auth.user.forEach((user: any) => {
      this.uid = user.uid;
      console.log(this.uid);
    });
    this.nameList = 'favourite';
    setTimeout(() => {
      this.arrayFilm = this.filmsService.filmUserList(this.nameList, this.uid);
      this.arrayFilm.__zone_symbol__value.forEach((obj: any) => {
        this.arrayFilm = obj;
        console.log(obj);
      });
    }, 1000);
  }
  async queryMoviesByInput(listName: string) {
    console.log(this.form.value.filterTitle);

    this.arrayFilm = this.filmsService.filmUserList(this.nameList, this.uid);
    this.arrayFilm.__zone_symbol__value.forEach((obj: any) => {
      this.arrayFilm = obj.filter((ele: any) =>
        ele.title.includes(this.form.controls['filtroTitle'].value)
      );
      console.log(obj);
    });
  }
  async delete(film: any, listName: string) {
    if (this.uid && film != undefined) {
      console.log(film);
      await this.angularFirestore
        .collection(`${listName}/${this.uid}/idFilms/`)
        .doc(film.uid)
        .delete()
        .catch((error) => console.log(error));
      console.log(`${listName}/${this.uid}/idFilms/${film.uid}`);
      return alert('film eliminato dalla lista ,' + listName);
    }
  }

  changeList(list: string) {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      this.nameList = list;
      this.arrayFilm = this.filmsService.filmUserList(this.nameList, this.uid);
      this.arrayFilm.__zone_symbol__value.forEach((obj: any) => {
        this.arrayFilm = obj;
        console.log(obj);
      });

      this.title = this.nameList.toLocaleUpperCase();
    }
  }
  @Output() submitEM = new EventEmitter();
}
