import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from './Component/side-bar/side-bar.component';
import { FooterComponent } from './Component/footer/footer.component';
import { MainComponent } from './Component/main/main.component';
import { CardComponent } from './Component/card/card.component';
import { CardContainerComponent } from './Component/card-container/card-container.component';
import { LoginComponent } from './Component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './Component/signup/signup.component';
import { HomeComponent } from './Component/home/home.component';
import { ArchiveComponent } from './Component/archive/archive.component';

import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon'

import { HttpClientModule } from '@angular/common/http';
import { UserPageComponent } from './Component/user-page/user-page.component';
import { JumbotronHomeComponent } from './Component/jumbotron-home/jumbotron-home.component';
import { HeaderComponent } from './Component/header/header.component';
import { ReviewForm } from './Component/review-form/review-form.component';
import { Cart } from "./Component/cart/cart.component";
@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    FooterComponent,
    MainComponent,
    CardComponent,
    CardContainerComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ArchiveComponent,
    JumbotronHomeComponent,
    UserPageComponent,
    ReviewForm,
    Cart

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([

      { path: '', component: HomeComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'archive/:id', component: ArchiveComponent },
      { path: 'film/:id', component: CardComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'user/:id', component: UserPageComponent}
    ]),
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatIconModule,

    HttpClientModule
    ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
