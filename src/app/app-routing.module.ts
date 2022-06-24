import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArchiveComponent } from './Component/archive/archive.component';
import { CardComponent } from './Component/card/card.component';
import { HomeComponent } from './Component/home/home.component';
import { InfoUser } from './Component/InfoUser/infoUser.component';
import { InsertUserdataComponent } from './Component/insert-userdata/insert-userdata.component';
import { LoginComponent } from './Component/login/login.component';
import { SignupComponent } from './Component/signup/signup.component';
import { UserPageComponent } from './Component/user-page/user-page.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin: any = () =>
  redirectUnauthorizedTo(['login']);
const loggedGuard: any = () => redirectLoggedInTo(['']); //guard > restituisce true (se loggato, e riporta in home) o false

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'archive/:id/:lang', component: ArchiveComponent },
  { path: 'film/:id', component: CardComponent },
  { path: 'login', component: LoginComponent, ...canActivate(loggedGuard) },
  { path: 'signup', component: SignupComponent, ...canActivate(loggedGuard) },
  { path: 'user', component: UserPageComponent },
  { path: 'user/:id/infoUser', component: InfoUser },
  {
    path: 'insert',
    component: InsertUserdataComponent,
    // ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
