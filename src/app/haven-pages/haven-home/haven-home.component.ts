import { Component, OnInit } from '@angular/core';

import { HavenWindowService } from '@app/haven-core';

import { HavenWindow } from '@app/haven-features';

@Component({
  selector: 'app-haven-home',
  templateUrl: './haven-home.component.html',
  styleUrls: ['./haven-home.component.css']
})
export class HavenHomeComponent implements OnInit {

  constructor(private windowService: HavenWindowService, ) { }

  ngOnInit() {
  }

  addWindow() {
    const havenWindow = new HavenWindow('Test', 'Btm', 100, 100, 400, 400, false);
    this.windowService.addWindow(havenWindow);
  }

}
