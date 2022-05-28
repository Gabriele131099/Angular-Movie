import { Component, OnInit } from '@angular/core';
import { IHero } from '../Interfaces/IHero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  //inizializzazione dell array che andrà a contenere gli eroi per le stampe e le azioni del componente 
  heroes: IHero[] = [];

  // !warning! ??????? Permette l'accesso a dei metodi di un file ?????? !warning!
  constructor(private heroService: HeroService) { }

//Restituisce l'intero array degli eroi al caricamento del componente
  ngOnInit(): void {
    this.getHeroes();
    
  }
  
//quanti eroi voglio mostrare a video, slice andrà a selezionare dall indice 1 all indice 5
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5)); 
  }
}