import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-infoUser',
  templateUrl: './infoUser.component.html',
  styleUrls: ['./infoUser.component.scss'],
})
export class InfoUser implements OnInit {
  arrayUsers: IUser[] = JSON.parse(localStorage.getItem('arrayUsers') || '');
  userLogFlag: any = localStorage.getItem('userLogFlag');
  user: any;
  userId: number = parseInt(localStorage.getItem('userId') || '');

  constructor(private route: ActivatedRoute, private router: Router) {
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
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      const newUser = {
        id: this.userId,
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
        date: this.form.value.date,
        genre: this.form.value.genre,
      };
      this.arrayUsers.forEach((obj: any) => {
        if (obj.id == this.userId) {
          obj = newUser;
          console.log(newUser)
          alert('aggiornamento avvenuto');
        }
      });
      localStorage.setItem('arrayUsers', JSON.stringify(this.arrayUsers));
      console.log(this.arrayUsers);
    }
  }
  value: string = '';
  @Output() submitEM = new EventEmitter();
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.user = this.arrayUsers.filter((obj: any) => obj.id == id)[0];
  }
}
