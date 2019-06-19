import { Component, OnInit } from '@angular/core';
import { HavenWindowService } from '@app/haven-core';

import { HavenWindow } from '../../../haven-window/shared/haven-window';

import { MenuBladeItem } from '../menu-blade-item/menu-blade-item.component';
@Component({
  selector: 'app-haven-dashboard',
  templateUrl: './haven-dashboard.component.html',
  styleUrls: ['./haven-dashboard.component.css'],

})
export class HavenDashboardComponent implements OnInit {
  value = 2018;

  chartMenuState = 'notactive';
  mapMenuState = 'notactive';
  accountMenuState = 'notactive';

  constructor(private windowService: HavenWindowService, ) { }

  chartItems: MenuBladeItem[] = [
    {
      text: 'cow',
      icon: 'person',
      click: () => { },
    },
    {
      text: 'cow',
      icon: 'person',
      click: () => { },
    },
  ];

  mapItems = [
    {
      text: 'cow',
      icon: 'person',
      click: () => { },
    },
    {
      text: 'cow',
      icon: 'person',
      click: () => { },
    },
  ];


  accountItems = [
    {
      text: 'cow',
      icon: 'person',
      click: () => { },
    },
  ];


  ngOnInit() {
  }
  addWindow() {
    const havenWindow = new HavenWindow('Test', 'Btm', 100, 100, 400, 400, false);
    this.windowService.addWindow(havenWindow);
  }

  toggleChartMenu() {
    this.mapMenuState = 'notactive';
    this.accountMenuState = 'notactive';
    this.chartMenuState = (this.chartMenuState === 'active' ? 'notactive' : 'active');
  }

  toggleMapMenu() {
    this.chartMenuState = 'notactive';
    this.accountMenuState = 'notactive';
    this.mapMenuState = (this.mapMenuState === 'active' ? 'notactive' : 'active');
  }

  toggleAccountMenu() {
    this.chartMenuState = 'notactive';
    this.mapMenuState = 'notactive';
    this.accountMenuState = (this.accountMenuState === 'active' ? 'notactive' : 'active');
  }
}
