import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/Interfaces/IUser';
import {USERS} from '../../../assets/user'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  arrayUsers:IUser[] = USERS
  constructor(  private route: ActivatedRoute,) { }
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  loginError:string=''
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      console.log(this.form.value.username)
      this.arrayUsers.forEach((obj:any)=>{
        if (obj.username==this.form.value.username && obj.password==this.form.value.password) {
          this.loginError= 'credenziali corrette'
        }else{
          this.loginError='credenziali non esistenti, '
        }
      })
      console.log(this.arrayUsers)
    }
  }

  @Output() submitEM = new EventEmitter();
  ngOnInit(): void {
  }

}
