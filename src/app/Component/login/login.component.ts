import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { IUser } from '../../Interfaces/IUser';
import { USERS } from '../../../assets/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  arrayUsers: any[] = JSON.parse(localStorage.getItem('arrayUsers') || '');
  currentUser: any;
  logInMessage: string = '';

  constructor(public auth: AngularFireAuth, public router: Router) {
    this.auth.authState.subscribe((user) => (this.currentUser = user));
    this.router = router;
  }

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  get email() {
    return this.form.controls['email'].value;
  }

  get password() {
    return this.form.controls['password'].value;
  }

  logInWithPassword() {
    this.auth.setPersistence('local').then(() => {
      this.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.currentUser = userCredential.user;
          // console.log(userCredential.user._delegate.uid);
          // localStorage.setItem('uidUser', `${userCredential.user._delegate.uid}`);
          // console.log(localStorage.getItem('uidUser'));
          this.router.navigate(['']);
        })
        .catch((err) => {
          this.logInMessage = err;
        });
    });
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider(); //>> la trasformo in una promise
    await this.auth.setPersistence('local').then(() => {
      this.auth
        .signInWithPopup(provider) // tutte le funzioni successive non saranno eseguite finchè la funz non restituisce
        .then((userCredential) => {
          this.currentUser = userCredential.user; // ritorna una promise!! >> ci accedo con then
          //>> tutto ciò che è qui non attende l'esecuzione dentro il then -> ricorriamo ad async await
          this.router.navigate(['./home']);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      console.log(this.form.value.username);

      this.arrayUsers.forEach((obj: any) => {
        if (
          obj.username == this.form.value.username &&
          obj.password == this.form.value.password
        ) {
          localStorage.setItem('userLogFlag', 'true');
          localStorage.setItem('userId', obj.id);
          location.href = `./user/${obj.id}`;
          this.logInMessage = '';
        } else {
          this.logInMessage = 'credenziali non esistenti';
        }
      });
      console.log(this.arrayUsers);
    }
  }

  @Output() submitEM = new EventEmitter();
  ngOnInit(): void {}
}
