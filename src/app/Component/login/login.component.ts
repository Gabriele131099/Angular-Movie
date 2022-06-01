import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/Interfaces/IUser';
import {USERS} from '../../../assets/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  arrayUsers:IUser[] = USERS

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.router = router;
    }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  logInMessage:string='';

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      console.log(this.form.value.username)

      this.arrayUsers.forEach((obj:any)=>{
        if (obj.username==this.form.value.username && obj.password==this.form.value.password) {
          this.logInMessage= 'credenziali corrette'
          //TODO send to logged page
          this.router.navigate(['./user']);
        }else{
          this.logInMessage='credenziali non esistenti'
        }
      })
      console.log(this.arrayUsers)
    }
  }

  @Output() submitEM = new EventEmitter();
  ngOnInit(): void {
  }

}
