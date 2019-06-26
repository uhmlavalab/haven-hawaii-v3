import { Component, OnInit } from '@angular/core';
import { Scenario } from '@app/haven-features/haven-scenario';

@Component({
  selector: 'app-map-menu',
  templateUrl: './map-menu.component.html',
  styleUrls: ['./map-menu.component.css']
})
export class MapMenuComponent implements OnInit {

  id: string;
  scenario: Scenario;
  query: any;

  loaded = false;

  constructor() { }

  ngOnInit() {
  }

}
