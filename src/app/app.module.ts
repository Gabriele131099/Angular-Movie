import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AsideComponent } from './Component/aside/aside.component';
import { FooterComponent } from './Component/footer/footer.component';
import { MainComponent } from './Component/main/main.component';
import { CardComponent } from './Component/card/card.component';
import { ContainerCardsComponent } from './Component/container-cards/container-cards.component';
import { LoginComponent } from './Component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './Component/signup/signup.component';
import { HomeComponent } from './Component/home/home.component';
import { ArchiveComponent } from './Component/archive/archive.component';

import { HttpClientModule } from '@angular/common/http';
import { UserPageComponent } from './Component/user-page/user-page.component';
@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    FooterComponent,
    MainComponent,
    CardComponent,
    ContainerCardsComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ArchiveComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([

      { path: '', component: HomeComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'film/:id', component: CardComponent },
      { path: 'logins', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'user', component: UserPageComponent}
    ]),
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    HttpClientModule
    ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
