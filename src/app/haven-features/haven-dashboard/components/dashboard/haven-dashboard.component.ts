import { Component, OnInit } from '@angular/core';

import { MenuBladeItem } from '../menu-blade-item/menu-blade-item.component';


import { HavenNewScenarioService } from '@app/haven-features/haven-scenario';

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

  constructor(public newScenarioService: HavenNewScenarioService ) { }

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


  ngOnInit() {
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

  openDialog () {
    this.newScenarioService.openDialog();
  }


}
