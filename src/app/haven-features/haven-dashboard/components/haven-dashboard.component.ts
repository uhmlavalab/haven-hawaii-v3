import { Component, OnInit } from '@angular/core';
import { HavenWindowService } from '@app/haven-core';
import {trigger, state, style, animate, transition} from '@angular/animations';

import { HavenWindow } from '../../haven-window/shared/haven-window';
@Component({
  selector: 'app-haven-dashboard',
  templateUrl: './haven-dashboard.component.html',
  styleUrls: ['./haven-dashboard.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      // state('default', style({ transform: 'rotate(-90deg)', left: '-275px' })),
      // state('rotated', style({ transform: 'rotate(-15deg)', left: '0px' })),
      state('default', style({ width: '0px', height: '0px', borderTop: '100px solid darkgray', borderRight: '100px solid darkgray' })),
      state('rotated', style({ width: '175px', height: '175px', borderTop: '100px solid #285f8d', borderRight: '100px solid #285f8d' })),
      transition('rotated => default', animate('1000ms ease-out')),
      transition('default => rotated', animate('1000ms ease-in'))
  ])
]
})
export class HavenDashboardComponent implements OnInit {
  value = 2018;
  constructor(private windowService: HavenWindowService,) { }
  state = 'default';

  ngOnInit() {
  }
  addWindow() {
    const havenWindow = new HavenWindow('Test', 'Btm', 100, 100, 400, 400, false);
    this.windowService.addWindow(havenWindow);
  }


  rotate() {
      this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
}
