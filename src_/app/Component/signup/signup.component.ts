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
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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

  matcher: any;
  signUpMessage: string = '';

  ////////////////////////////
  userCollection: any = this.angularFirestore.collection('users');

  fileRef: any;
  file: any;
  n: any = Date.now();
  filePath = `userCover/${this.n}`;

  constructor(
    public auth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private angularStorage: AngularFireStorage,
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
      date: new FormControl(''),
      gender: new FormControl(''),
      img: new FormControl(''),
    },
    {
      validators: passwordMatchValidator(), // cross field validatr
    }
  );

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

  get date() {
    return this.form.controls['date'].value;
  }

  get gender() {
    return this.form.controls['gender'].value;
  }

  get img() {
    return this.form.controls['img'].value;
  }

  async signUpWithPassword() {
    const task = this.angularStorage.upload(this.filePath, this.file);

    await task.then((data: any) => {
      this.fileRef
        .getDownloadURL()
        .toPromise()
        .then((link: any) => {
          this.auth
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
              this.userCollection.doc(userCredential.user?.uid).set({
                username: this.form.value.username,
                date: this.form.value.date,
                gender: this.form.value.gender,
                image: link,
              });
              this.router.navigate(['./login']);
            })
            ///?///
            .catch((err) => {
              this.signUpMessage = err;
            });
          ///?///
        });
    });
  }

  /////////////////////////////////////////////
  // inserisci(): void {
  //   const task = this.angularStorage.upload(this.filePath, this.file);
  //   task.then((data: any) => {
  //     //caricato il file, richiedo il downloadurl(observable) >topromise, finita la chiamata efffettua l'inserim
  //     this.fileRef
  //       .getDownloadURL()
  //       .toPromise()
  //       .then((link: any) => {
  //         this.userCollection
  //           .add({
  //             username: this.form.value.username,
  //             date: this.form.value.date,
  //             gender: this.form.value.gender,
  //             image: link,
  //           })
  //           .then((data: any) => {
  //             console.log(data);
  //           });
  //       });
  //   });
  //   console.log(this.form.value);
  // }

  // async signUpWithPassword() {
  //   //>> la trasformo in una promise

  //   await this.auth
  //     .createUserWithEmailAndPassword(this.email, this.password) // tutte le funzioni successive non saranno eseguite finchè la funz non restituisce
  //     .then((data) => {
  //       this.auth.setPersistence('local').then(() => {
  //         this.auth
  //           .signInWithEmailAndPassword(this.email, this.password)
  //           .then((userCredential) => {
  //             this.currentUser = userCredential.user;
  //           })
  //           .catch((err) => {});
  //       });
  //     })
  //     .catch((err) => {
  //       this.signUpMessage = err;
  //     }); // ritorna una promise!! >> ci accedo con then
  //   this.inserisci();
  //   // }
  // }

  async signUpWithGoogle() {
    const provider = new GoogleAuthProvider();

    await this.auth.setPersistence('local').then(() => {
      this.auth
        .signInWithPopup(provider)
        .then((userCredential) => {
          this.currentUser = userCredential.user;
          this.signUpMessage = '';
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

  async inserisciImg(event: any) {
    console.log(event.target);
    this.file = event.target.files[0];
    this.fileRef = this.angularStorage.ref(this.filePath); // salva il riferimento
    console.log(this.fileRef);

    //const task = this.userCollection.upload(`bills/${n}`, file);
  }

  @Output() submitEM = new EventEmitter();
  ngOnInit(): void {}
}
