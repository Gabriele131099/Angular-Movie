import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/Interfaces/IUser';
import { USERS } from '../../../assets/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  arrayUsers: IUser[] = USERS;
  constructor(private route: ActivatedRoute) {}
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  signupError: string = '';
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      let userExist = this.arrayUsers.filter((obj:any)=>(obj.username==this.form.value.username))
      console.log(userExist)
      if (userExist.length>0) {
        this.signupError = 'user esistente';
      }else if (this.form.value.password.length <= 8 || !this.form.value.password.includes('.') || this.form.value.confirmPassword != this.form.value.password) {
          if ( this.form.value.password.length <= 8) {
            this.signupError = `La password è troppo breve /n`;
          }
          if (!this.form.value.password.includes('.')) {
            this.signupError += `La password deve avere un punto /n`;
          }
          if ( this.form.value.confirmPassword != this.form.value.password) {
            this.signupError += `Le password non corrispondono, idiota devi controllare /n`;
          }
        } else {
          const newUser = {
            id: this.arrayUsers.length,
            username: this.form.value.username,
            password: this.form.value.password,
          };
          this.signupError = 'sei registrato'; //da togliere, per lettura
          this.arrayUsers.push(newUser);
        }
      }

      console.log(this.arrayUsers);
      // window.location.replace("logins");
    
  }

  @Output() submitEM = new EventEmitter();
  ngOnInit(): void {}
}
