import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { FilmsService } from 'src/app/services/films.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reviewForm',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewForm implements OnInit {
  @Input() id_film: any;
  form: FormGroup = new FormGroup({
    vote: new FormControl(),
    recensione: new FormControl(''),
  });
  constructor(
    private auth: AngularFireAuth,
    private filmsService: FilmsService,
    private angularFirestore: AngularFirestore
  ) {}
  arrayRecensioni: any;
  user$: any;
  email: string | undefined;
  reviewCollection: any = this.angularFirestore.collection<any>('reviews');
  async submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      if (this.form.value.vote > 0 && this.email != undefined) {
        const jsonRecensioni = {
          id_user: this.email,
          id_film: this.id_film,
          vote: this.form.value.vote,
          recensione: this.form.value.recensione,
        };
        await this.reviewCollection
          .add(jsonRecensioni)
          .then((data: any) => {
            console.log(data);
          })
          .catch((error: any) => {
            console.log('errore in Post', error);
          }); // metodo add delle collection gestisce anche loffline
      } else {
        if (this.email == undefined) {
          alert('ti devi loggare');
        }
        if (this.form.value.vote == 0) {
          alert('Devi dare una valutazione in stelle');
        }
      }
    }
  }
  @Output() submitEM = new EventEmitter();

  ngOnInit(): void {
    this.user$ = this.auth.user;
    this.user$.forEach((obj: any) => {
      this.email = obj._delegate.email;
    });
  }
}
