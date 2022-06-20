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
username:string=''
  form: FormGroup = new FormGroup({
    username: new FormControl(this.arrayUsers[this.userId].username),
    email: new FormControl(this.arrayUsers[this.userId].email),
    password: new FormControl(this.arrayUsers[this.userId].password),
    confirmPassword: new FormControl(''),
    date: new FormControl(''),
    genre: new FormControl(this.arrayUsers[this.userId].genre),
  });

  submit() {
    let confermaChange= prompt('inserisca la sua password per abilitare le modifiche')
    
    if (this.form.valid && confermaChange==this.user.password) {
       console.log(this.arrayUsers)
      this.submitEM.emit(this.form.value);
      let tmpUsersname = this.arrayUsers.filter((obj:IUser)=>
        (obj.username==this.form.value.username && obj.username!=this.user.username)
      )

      let tmpEmail = this.arrayUsers.filter((obj:IUser)=>
        (obj.email==this.form.value.email && obj.email!=this.user.email)
      )
      console.log(tmpUsersname)
      if(tmpUsersname.length==0 && tmpEmail.length==0 &&
        ((this.form.value.username.length>7 && this.form.value.username.includes('.'))&&
        (this.form.value.email.includes('.') && this.form.value.email.includes('@') && this.form.value.email.length>4) &&
        (this.form.value.password.includes('.') &&  this.form.value.email.length>6) &&
        (this.form.value.password == this.form.value.confirmPassword))
         ){
        const newUser = {
          id: this.userId,
          username: this.form.value.username.toString(),
          email: this.form.value.email.toString(),
          password: this.form.value.password.toString(),
          date: this.form.value.date.toString(),
          genre: this.form.value.genre.toString(),
        }
         console.log(newUser)
      for (let index = 0; index < this.arrayUsers.length; index++) {
        if (this.arrayUsers[index].id == this.userId) {

          this.arrayUsers[index] = newUser;
          console.log(newUser)
          alert('aggiornamento avvenuto');
          localStorage.setItem('arrayUsers', JSON.stringify(this.arrayUsers));
          console.log(localStorage.getItem('arrayUsers'));
        }
      }
      }else{
        if (tmpUsersname.length>0 ) {
          alert('username è già presente')
        }
        if (this.form.value.username.length <=7 || !this.form.value.username.includes('.')) {
          alert('L username non rispetta le regole')
        }
        if (tmpEmail.length>0 ) {
          alert('email è già presente')
        }
        if (!this.form.value.email.includes('.') || !this.form.value.email.includes('@') || this.form.value.email.length<=4) {
          alert('L email non rispetta le regole')
        }

        if (!this.form.value.password.includes('.') ||  this.form.value.email.length<=6) {
          alert('La password non rispetta le regole')
        } 

        if  (this.form.value.password != this.form.value.confirmPassword) {
          alert('Le password non coincidono')
        }

      };
     
    }
  }
  value: string = '';
  @Output() submitEM = new EventEmitter();
  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id')
    if (id==this.userId.toString()) {
      this.user = this.arrayUsers.filter((obj: any) => obj.id == this.userId)[0];
    }else{
      alert('ma sei un hacker')
      location.href = `./user/${this.userId}/infoUser`
    }
    
  }
}
