import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reviewForm',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewForm implements OnInit {
  userLogFlag:any = localStorage.getItem('userLogFlag')
  @Input() id_film:any
  form: FormGroup = new FormGroup({
    recensione: new FormControl(''),
  });
  constructor(
  ) { }
  @Input() arrayRecensioni:any = []
  submit(){
    
    if (this.form.valid ) {
      this.submitEM.emit(this.form.value);
      if (this.userLogFlag=='true') {
      console.log(this.form.value)
      const jsonRecensioni = {
        id_user:parseInt(localStorage.getItem("userId") || ''),
        id_film:this.id_film,
        recensione:this.form.value.recensione
      }
      this.arrayRecensioni.push(jsonRecensioni)
      console.log(this.arrayRecensioni)
      }else{
        alert('per lasciare una recensione devi essere loggato')
      }
    }

  }
  @Output() submitEM = new EventEmitter();

  ngOnInit(): void {

  }
}
