import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-insert-userdata',
  templateUrl: './insert-userdata.component.html',
  styleUrls: ['./insert-userdata.component.scss'],
})
export class InsertUserdataComponent implements OnInit {
  constructor(
    private angularFirestore: AngularFirestore,
    private angularStorage: AngularFireStorage
  ) {}

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    date: new FormControl(''),
    gender: new FormControl(''),
    img: new FormControl(''),
  });

  film$: any; //dollaro: observer > dati presenti solo se chiamati

  userCollection: any = this.angularFirestore.collection('users');

  fileRef: any;
  file: any;
  n: any = Date.now();
  filePath = `userCover/${this.n}`;

  inserisci(): void {
    const task = this.angularStorage.upload(this.filePath, this.file);
    task.then((data: any) => {
      //caricato il file, richiedo il downloadurl(observable) >topromise, finita la chiamata efffettua l'inserim
      this.fileRef
        .getDownloadURL()
        .toPromise()
        .then((link: any) => {
          this.userCollection
            .add({
              username: this.form.value.username,
              date: this.form.value.date,
              genre: this.form.value.genre,
              image: link,
            })
            .then((data: any) => {
              console.log(data);
            }); // metodo add delle collection gestisce anche loffline
        });
    });
    console.log(this.form.value);
  }

  async inserisciImg(event: any) {
    console.log(event.target);
    this.file = event.target.files[0];
    this.fileRef = this.angularStorage.ref(this.filePath); // salva il riferimento
    console.log(this.fileRef);

    //const task = this.userCollection.upload(`bills/${n}`, file);
  }
  ngOnInit(): void {}
}
