import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from './Component/side-bar/side-bar.component';
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
import { MatNativeDateModule } from '@angular/material/core';
import {
  matDatepickerAnimations,
  MatDatepickerModule,
} from '@angular/material/datepicker';

import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { UserPageComponent } from './Component/user-page/user-page.component';
import { JumbotronHomeComponent } from './Component/jumbotron-home/jumbotron-home.component';
import { HeaderComponent } from './Component/header/header.component';
import { ReviewForm } from './Component/review-form/review-form.component';
import { Favourite } from './Component/favourite/favourite.component';
import { ReviewCarousel } from './Component/reviewCarousel/reviewCarousel.component';
import { CommonModule } from '@angular/common';
import { DialogExample } from './Component/dialog/dialog.component';
import { InfoUser } from './Component/InfoUser/infoUser.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { InsertUserdataComponent } from './Component/insert-userdata/insert-userdata.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
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
    Favourite,
    ReviewCarousel,
    DialogExample,
    InfoUser,
    InsertUserdataComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot([
    //   { path: '', component: HomeComponent },
    //   { path: 'archive', component: ArchiveComponent },
    //   { path: 'archive/:id/:lang', component: ArchiveComponent },
    //   { path: 'film/:id', component: CardComponent },
    //   { path: 'login', component: LoginComponent },
    //   { path: 'signup', component: SignupComponent },
    //   { path: 'user/:id', component: UserPageComponent },
    //   { path: 'user/:id/infoUser', component: InfoUser },
    // ]),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    ReactiveFormsModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions()), provideStorage(() => getStorage()),


  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
