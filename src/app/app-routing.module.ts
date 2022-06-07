import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './Component/card/card.component';
import { LoginComponent } from './Component/login/login.component';

const routes: Routes = [
  { path: 'film/:id', component: CardComponent },
      { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
