import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/Interfaces/IUser';
import { USERS } from '../../../assets/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit {
  arrayUsers: IUser[] = USERS;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
      this.router = router;
    }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  signUpMessage: string = '';

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      let userExist = this.arrayUsers.filter((obj:any)=>(obj.username==this.form.value.username))
      //console.log(userExist)
      if (userExist.length>0) {
        this.signUpMessage = 'user esistente';
      }else if (this.form.value.password.length <= 8 || !this.form.value.password.includes('.') || this.form.value.confirmPassword != this.form.value.password) {
          if ( this.form.value.password.length <= 8) {
            this.signUpMessage = `La password è troppo breve`;
          }
          if (!this.form.value.password.includes('.')) {
            this.signUpMessage += `La password deve avere un punto`;
          }
          if ( this.form.value.confirmPassword != this.form.value.password) {
            this.signUpMessage += `Le password non corrispondono, idiota devi controllare /n`;
          }

        } else {
          const newUser = {
            id: this.arrayUsers.length,
            username: this.form.value.username,
            password: this.form.value.password,
          };
          //this.signUpMessage = 'registrazione effettuata'; //da togliere, per lettura
          this.router.navigate(['./logins'])
          this.arrayUsers.push(newUser);
        }
      }

      console.log(this.arrayUsers);
      // window.location.replace("logins");

  }

  @Output() submitEM = new EventEmitter();
  ngOnInit(): void {}
}
