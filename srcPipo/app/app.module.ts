import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'; //componente dashboard
import { HeroesComponent } from './heroes/heroes.component';
import { DetailsComponent } from './details/details.component'; //componete heroes
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '',redirectTo: '/dashBoard', pathMatch: 'full' },
      { path: 'dashBoard', component: DashboardComponent },
      { path: 'heroes', component: HeroesComponent },
      { path: 'details/:id', component: DetailsComponent },
    ]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
