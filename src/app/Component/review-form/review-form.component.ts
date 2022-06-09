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
  arrayUser:any=JSON.parse(localStorage.getItem('arrayUsers')||'')
  arrayRecensioni:any 
  submit(){
    
    if (this.form.valid ) {
      this.submitEM.emit(this.form.value);
      if (this.userLogFlag=='true') {
      console.log(this.form.value)
      let user = this.arrayUser.filter((obj:any)=>obj.id==parseInt(localStorage.getItem("userId") || ''))
      user = user[0]
      const jsonRecensioni = {
        id_user:user.username,
        id_film:this.id_film,
        recensione:this.form.value.recensione
      }
      this.arrayRecensioni = JSON.parse(localStorage.getItem('review')||'')
      this.arrayRecensioni.push(jsonRecensioni)
      localStorage.setItem('review',JSON.stringify(this.arrayRecensioni )||'')
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
