import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { IUser } from '../../Interfaces/IUser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  arrayUsers: any[] = JSON.parse(localStorage.getItem('arrayUsers') || '');

  constructor(
    public auth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router = router;
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    date: new FormControl(''),
    genre: new FormControl(''),
  });

  matcher: any;
  signUpMessage: string = '';

  get email() {
    return this.form.controls['email'].value;
  }

  get password() {
    return this.form.controls['password'].value;
  }

  async signUpWithPassword() {
    //>> la trasformo in una promise
    if (this.form.value.confirmPassword != this.form.value.password) {
      this.signUpMessage += `Le password non corrispondono, idiota devi controllare /n`;
    } else {
      await this.auth
        .createUserWithEmailAndPassword(this.email, this.password) // tutte le funzioni successive non saranno eseguite finchè la funz non restituisce
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        }); // ritorna una promise!! >> ci accedo con then
    }
  }
  async signUpWithGoogle() {
    //>> la trasformo in una promise
    const provider = new GoogleAuthProvider();
    await this.auth
      .signInWithPopup(provider) // tutte le funzioni successive non saranno eseguite finchè la funz non restituisce
      .then((data) => {}); // ritorna una promise!! >> ci accedo con then
    //>> tutto ciò che è qui non attende l'esecuzione dentro il then -> ricorriamo ad async await
  }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      console.log(this.form.value);
      console.log(this.arrayUsers);
      console.log(JSON.parse(localStorage.getItem('arrayUsers') || ''));

      //console.log(userExist)

      // const newUser = {
      //   id: this.arrayUsers.length,
      //   username: this.form.value.username,
      //   email: this.form.value.email,
      //   password: this.form.value.password,
      //   date: this.form.value.date,
      //   genre: this.form.value.genre,
      // };
      //this.signUpMessage = 'registrazione effettuata'; //da togliere, per lettura

      // this.arrayUsers.push(newUser);
      // localStorage.setItem('arrayUsers', JSON.stringify(this.arrayUsers));
    }
    console.log(this.arrayUsers);
    // window.location.replace("login");
  }
  @Output() submitEM = new EventEmitter();
  ngOnInit(): void {}
}
