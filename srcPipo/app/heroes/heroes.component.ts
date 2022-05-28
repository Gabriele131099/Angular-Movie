import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HEROES } from '../heroList';
import { IHero } from '../Interfaces/IHero';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  arrayHeoroes:IHero[] = HEROES
  ngOnInit(): void {
  }

}
