import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-reviewCarousel',
  templateUrl: './reviewCarousel.component.html',
  styleUrls: ['./reviewCarousel.component.scss'],
})
export class ReviewCarousel implements OnInit {
  @Input() idFilm: any;
  reviewCollection: any;
  arrayRecensioni$: any;

  @Input() flag: any = true;
  recensione: any;
  close() {
    this.flag = false;
  }

  filtroRecensioni = 0;
  posizioneRecensione: number = 0;
  slideShowRight() {
    this.arrayRecensioni$.forEach((obj: any) => {
      if (this.posizioneRecensione >= obj.length - 1) {
        this.posizioneRecensione = 0;
        this.recensione = obj[this.posizioneRecensione];
      } else {
        this.posizioneRecensione++;
        this.recensione = obj[this.posizioneRecensione];
      }
    });
  }
  slideShowLeft() {
    this.arrayRecensioni$.forEach((obj: any) => {
      if (this.posizioneRecensione <= 0) {
        this.posizioneRecensione = obj.length - 1;
        this.recensione = obj[this.posizioneRecensione];
      } else {
        this.posizioneRecensione--;
        this.recensione = obj[this.posizioneRecensione];
      }
      console.log(this.posizioneRecensione);
    });
  }
  queryReviewsFilm() {
    let reviews: any = (this.reviewCollection =
      this.angularFirestore.collection<any>('reviews', (ref) =>
        ref.where('id_film', '==', this.idFilm)
      ));

    return reviews.valueChanges();
  }
  queryReviewsFilmAndVote() {
    let reviews: any;
    if (this.filtroRecensioni != 0) {
      reviews = this.reviewCollection = this.angularFirestore.collection<any>(
        'reviews',
        (ref) =>
          ref
            .where('id_film', '==', this.idFilm)
            .where('vote', '==', this.filtroRecensioni)
      );
    } else {
      reviews = this.reviewCollection = this.angularFirestore.collection<any>(
        'reviews',
        (ref) => ref.where('id_film', '==', this.idFilm)
      );
    }

    this.arrayRecensioni$ = reviews.valueChanges();
    this.arrayRecensioni$.forEach((obj: any) => {
      this.arrayRecensioni$ = obj;
      this.recensione = obj[0];
    });
  }
  constructor(
    private filmsService: FilmsService,
    private angularFirestore: AngularFirestore
  ) {}
  ngOnInit(): void {
    this.arrayRecensioni$ = this.queryReviewsFilm();
    this.arrayRecensioni$.forEach((obj: any) => {
      this.arrayRecensioni$ = obj;
      this.recensione = obj[0];
    });
  }
}
