import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';
import { Observable } from 'rxjs';
import { IMovie } from '../../Interfaces/IMovies';

@Component({
  selector: 'app-single-film',
  templateUrl: './single-film.component.html',
  styleUrls: ['./single-film.component.scss'],
})
export class SingleFilmComponent implements OnInit {
  user: any;
  uid: string | undefined;
  pathPoster: string = 'https://image.tmdb.org/t/p/original/';
  message: string = '';
  userLogFlag: any;
  arrayFiltroGenre: any = [];
  arrayGenre: any = [];
  @Input() film: IMovie | undefined;
  userListsCollection: any = this.angularFirestore.collection('userList');
  constructor(
    private angularFirestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.auth.user.forEach((user: any) => {
      this.uid = user.uid;
      console.log(this.uid);
    });
  }
  /**
   * funzione query per user
   * @param film
   * @param listName
   * @returns
   */
  queryUserListsById(film: IMovie, listName: string) {
    let lists: any = (this.userListsCollection =
      this.angularFirestore.collection<any[]>(`${listName}`, (ref) =>
        ref.where('user', '==', `filippo`).where('film', '==', film)
      ));

    return lists.valueChanges();
  }

  /**
   * funzione add film in una list
   * @param film
   * @param listName
   */
  async addList(film: any, listName: string) {
    if (this.uid) {
      console.log(film);
      this.angularFirestore
        .collection(`${listName}/${this.uid}/idFilms`)
        .doc(film.uid)
        // .delete()
        .set({ title: film.title })
        .catch((error) => console.log(error));
      console.log(`${listName}/${this.uid}/idFilms`);
      return alert('film caricato nella lista ,' + listName);
    }
  }
  async delete(film: any, listName: string) {
    if (this.uid) {
      console.log(film);
      this.angularFirestore
        .collection(`${listName}/${this.uid}/idFilms`)
        .doc(film.uid)
        .delete()
        .catch((error) => console.log(error));
      console.log(`${listName}/${this.uid}/idFilms`);
      return alert('film caricato nella lista ,' + listName);
    }
  }
  reset() {
    // this.filmsService.getFilms().subscribe((films) => {
    //   this.filtroGenre = 0;
    //   this.filtroTitle = '';
    //   this.languageFilter = 'all';
    //   this.arrayFiltroGenre = [];
    //   this.filmsResult = films;
    // });
  }
}
