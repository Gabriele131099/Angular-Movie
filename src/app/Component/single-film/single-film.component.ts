import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';
import { IMovie } from '../../Interfaces/IMovies';

@Component({
  selector: 'app-single-film',
  templateUrl: './single-film.component.html',
  styleUrls: ['./single-film.component.scss'],
})
export class SingleFilmComponent implements OnInit {
  pathPoster: string = 'https://image.tmdb.org/t/p/original/';
  message: string = '';
  userLogFlag: any;
  constructor(private angularFirestore: AngularFirestore) {}
  @Input() film: IMovie | undefined;
  userListsCollection: any = this.angularFirestore.collection('userList');
  queryUserListsById(film: IMovie, listName: string) {
    let lists: any = (this.userListsCollection =
      this.angularFirestore.collection<any[]>(`${listName}`, (ref) =>
        ref.where('user', '==', `filippo`).where('film', '==', film)
      ));

    return lists.valueChanges();
  }

  async addList(film: any, listName: string) {
    let list = this.queryUserListsById(film, listName);
    list.forEach((obj: any) => {
      console.log(obj);
      console.log(obj.length);
      if (obj.length > 0) {
        return alert('il film esiste in ' + listName);
      } else {
        list = this.angularFirestore.collection(`${listName}`).add({
          user: 'filippo',
          film: film,
        });
        return alert('film caricato nella lista ,' + listName);
      }
    });
  }

  arrayFiltroGenre: any = [];
  arrayGenre: any = [];
  reset() {
    // this.filmsService.getFilms().subscribe((films) => {
    //   this.filtroGenre = 0;
    //   this.filtroTitle = '';
    //   this.languageFilter = 'all';
    //   this.arrayFiltroGenre = [];
    //   this.filmsResult = films;
    // });
  }
  ngOnInit(): void {}
}
