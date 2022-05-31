import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FILMS } from 'src/assets/film';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  arrayFilms:any = FILMS;

  cercaFiltro:any = ""
  arrayFilmFiltrato = this.arrayFilms.filter((obj:any)=>
  (obj.Title.includes(this.form.value.this.cercaFiltro)))
  
  constructor() { }
  form: FormGroup = new FormGroup({
    cercaFiltro: new FormControl(''),
  });
  ngOnInit(): void {

  }
  
  arrayFiltrato(){
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);      
      this.arrayFilmFiltrato = this.arrayFilms.filter((obj:any)=>
        (obj.Title==this.form.value.cercaFiltro))
  
    }
    
  }
  
  @Output() submitEM = new EventEmitter();
}
