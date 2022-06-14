import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces/IUser';
import {USERS} from '../../../assets/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  arrayUsers:IUser[] = JSON.parse(localStorage.getItem('arrayUsers')||'')

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
          localStorage.setItem('userLogFlag', 'true');
          localStorage.setItem('userId', obj.id);
          location.href = `./user/${obj.id}`;
          this.logInMessage=''
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
