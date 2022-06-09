import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviewCarousel',
  templateUrl: './reviewCarousel.component.html',
  styleUrls: ['./reviewCarousel.component.scss']
})
export class ReviewCarousel implements OnInit {
@Input() idFilm:any
arrayRecensioni :any

 flag:any=true
 recensione:any 
 close(){
  this.flag= false
}
posizioneRecensione:number = 0
slideShowRight(){
  if (this.posizioneRecensione >= this.arrayRecensioni.length-1) {
    this.posizioneRecensione= 0
    this.recensione  = this.arrayRecensioni[this.posizioneRecensione]
  }else{
    this.posizioneRecensione++;
    this.recensione  = this.arrayRecensioni[this.posizioneRecensione]
  }
  console.log(this.posizioneRecensione)
  
}
slideShowLeft(){
  if (this.posizioneRecensione<=0) {
    this.posizioneRecensione= this.arrayRecensioni.length-1
    this.recensione  = this.arrayRecensioni[this.posizioneRecensione]
  }else{
    this.posizioneRecensione--;
    this.recensione  = this.arrayRecensioni[this.posizioneRecensione]
  }
  console.log(this.posizioneRecensione)
}
  constructor() { }
  ngOnInit(): void {
   this.arrayRecensioni = JSON.parse(localStorage.getItem('review')||'')
    this.arrayRecensioni = this.arrayRecensioni.filter((obj:any)=>obj.id_film==this.idFilm)
    this.recensione= this.arrayRecensioni[this.posizioneRecensione]
    console.log(this.arrayRecensioni)
  }

}
