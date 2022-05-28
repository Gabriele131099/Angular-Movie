import { Component, OnInit } from '@angular/core';
import { IHero } from '../Interfaces/IHero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: IHero[] = []

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
  constructor(private heroService: HeroService) { }
  
  ngOnInit(): void {
    this.getHeroes()
  }

}