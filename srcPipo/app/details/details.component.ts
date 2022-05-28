import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HEROES } from '../heroList';
import { IHero } from '../Interfaces/IHero';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  arrayHeroes:IHero[ ] = HEROES
  hero:IHero | undefined
  nameHero: any = '';

  setValueHero() {
   if (this.hero) {
    this.hero.name = this.nameHero
   
    for (let i = 0; i < this.arrayHeroes.length; i++) {
      const element = this.arrayHeroes[i];
      if (element.id==this.hero.id) {
        this.arrayHeroes[i] = this.hero
      }
    }
   }
   console.log(this.arrayHeroes)
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idHero = Number(routeParams.get('id'));
    for (let i = 0; i < this.arrayHeroes.length; i++) {
      const element = this.arrayHeroes[i];
      if (element.id==idHero) {
        this.hero = element
      }
    }
    console.log(idHero)
  }
  constructor(private route: ActivatedRoute) {
    
   }

}
