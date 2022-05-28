import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HEROES } from '../heroList';
import { IHero } from '../Interfaces/IHero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  arrayHeoroes:IHero[] = HEROES
  // arrayStampa:any=[]
  ngOnInit(): void {
    // for ( let i = 0; i < 4; i++) {
    //   this.arrayStampa.push(this.arrayHeoroes[i])
    // }
  }

}
