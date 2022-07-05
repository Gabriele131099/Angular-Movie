import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-userdata',
  templateUrl: './insert-userdata.component.html',
  styleUrls: ['./insert-userdata.component.scss'],
})
export class InsertUserdataComponent implements OnInit {
  constructor(
    private angularFirestore: AngularFirestore,
    private angularStorage: AngularFireStorage,
    private router: Router,
    private auth: AngularFireAuth
  ) {
    this.router = router;
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    date: new FormControl(''),
    gender: new FormControl(''),
    img: new FormControl(''),
  });

  // username: any = this.form.value.username;
  // birthDay: any = this.form.value.date;
  // gender: any = this.form.value.gender;

  errMessage: string = '';
  okMessage: string = '';
  film$: any; //dollaro: observer > dati presenti solo se chiamati

  userCollection: any = this.angularFirestore.collection('users');

  fileRef: any;
  file: any;
  n: any = Date.now();

  filePath = `userCover/${this.n}`;

  userUid: any;

  user$: any = this.auth.user;

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
              // metodo add delle collection gestisce anche l'upload offline
              uid: this.user$.uid,
              username: this.form.value.username,
              date: this.form.value.date,
              genre: this.form.value.gender,
              image: link,
            })
            .then((data: any) => {
              if (
                this.fileRef &&
                this.form.value.username &&
                this.form.value.date &&
                this.form.value.gender
              ) {
                //ci mette 3 secondi??
                this.okMessage = 'Inserimento dati avvenuto correttamente';
                this.router.navigate(['./user']);
              } else {
                console.log(this.form.value.username, 'data');
                this.errMessage =
                  'Dati mancanti! Tutti i campi sono obbligatori';
              }
            });
        });
    });
    // console.log(this.form.value, 'form.value');
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
