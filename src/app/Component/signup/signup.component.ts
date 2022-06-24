import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { IUser } from '../../Interfaces/IUser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true,
      };
    }
    return null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  arrayUsers: any[] = JSON.parse(localStorage.getItem('arrayUsers') || '');
  currentUser: any;

  constructor(
    public auth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router = router;
  }

  form: FormGroup = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    {
      validators: passwordMatchValidator(), // cross field validatr
    }
  );

  matcher: any;
  signUpMessage: string = '';

  get username() {
    return this.form.controls['username'].value;
  }
  get email() {
    return this.form.controls['email'].value;
  }

  get password() {
    return this.form.controls['password'].value;
  }

  get confirmPassword() {
    return this.form.controls['confirmPassword'].value;
  }

  async signUpWithPassword() {
    //>> la trasformo in una promise
    await this.auth
      .createUserWithEmailAndPassword(this.email, this.password) // tutte le funzioni successive non saranno eseguite finchè la funz non restituisce
      .then((data) => {
        // console.log(data);
        ////
        //logInWithPassword() {
        this.auth.setPersistence('local').then(() => {
          this.auth
            .signInWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
              this.currentUser = userCredential.user;
            })
            .catch((err) => {});
        });

        ////
      })
      .catch((err) => {
        this.signUpMessage = err;
        // alert(err);
      }); // ritorna una promise!! >> ci accedo con then
    // }
  }

  async signUpWithGoogle() {
    const provider = new GoogleAuthProvider();

    await this.auth.setPersistence('local').then(() => {
      this.auth
        .signInWithPopup(provider)
        .then((userCredential) => {
          this.currentUser = userCredential.user;
        })
        .catch((err) => {
          this.signUpMessage = err;
        });
    });
  }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      console.log(this.form.value);
      console.log(this.arrayUsers);
      console.log(JSON.parse(localStorage.getItem('arrayUsers') || ''));
    }
    console.log(this.arrayUsers);
    // window.location.replace("login");
  }
  @Output() submitEM = new EventEmitter();
  ngOnInit(): void {}
}
