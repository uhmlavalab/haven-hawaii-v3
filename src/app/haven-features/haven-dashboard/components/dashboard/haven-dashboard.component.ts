import { Component } from '@angular/core';

import { MenuBladeItem } from '../menu-blade-item/menu-blade-item.component';

import { HavenNewScenarioService, HavenScenarioListService, HavenScenarioService } from '@app/haven-features/haven-scenario';

import { HavenWindowService } from '@app/haven-features/haven-window';
import { ChartType, MapType } from '@app/haven-features/haven-apps/haven-apps.service';

@Component({
  selector: 'app-haven-dashboard',
  templateUrl: './haven-dashboard.component.html',
  styleUrls: ['./haven-dashboard.component.css'],

})
export class HavenDashboardComponent {
  value = 2018;

  chartMenuState = 'notactive';
  mapMenuState = 'notactive';
  settingsMenuState = 'notactive';

  buttons = [
    {
      bottom: '0px',
      left: '0px',
      icon: 'settings',
      text: 'Settings',
      selected: false,
      click: () => this.toggleSettingsMenu()
    },
    {
      bottom: '0px',
      left: '0px',
      icon: 'map',
      text: 'Maps',
      selected: false,
      click: () => this.toggleMapMenu()
    },
    {
      bottom: '0px',
      left: '0px',
      icon: 'show_chart',
      text: 'Charts',
      selected: false,
      click: () => this.toggleChartMenu()
    },
  ];

  chartItems: MenuBladeItem[] = [
    {
      text: 'Load',
      icon: 'fitness_center',
      click: () => { this.windowService.createChart(ChartType.load, this.scenarioService.getSelectedScenario()); },
    },
    {
      text: 'Generation',
      icon: 'flash_on',
      click: () => { this.windowService.createChart(ChartType.generation, this.scenarioService.getSelectedScenario()); },
    },
    {
      text: 'Capacity',
      icon: 'battery_std',
      click: () => { this.windowService.createChart(ChartType.capacity, this.scenarioService.getSelectedScenario()); },
    },
  ];

  mapItems = [
    {
      text: 'Street',
      icon: 'directions_car',
      click: () => { this.windowService.createMap(MapType.street, this.scenarioService.getSelectedScenario()); },
    },
    {
      text: 'Terrain',
      icon: 'terrain',
      click: () => { this.windowService.createMap(MapType.terrain, this.scenarioService.getSelectedScenario()); },
    },
    {
      text: 'Satellite',
      icon: 'satellite',
      click: () => { this.windowService.createMap(MapType.satellite, this.scenarioService.getSelectedScenario()); },
    },
  ];


  settingsItems = [
    {
      text: 'Sessions',
      icon: 'receipt',
      click: () => { },
    },
    {
      text: 'Save Session',
      icon: 'save',
      click: () => { },
    },
    {
      text: 'Scenarios',
      icon: 'folder',
      click: () => { this.scenarioListService.openScenarioListDialog(); },
    },
    {
      text: 'New Scenario',
      icon: 'create_new_folder',
      click: () => { this.newScenarioService.openNewScenarioDialog(); },
    },
  ];

  constructor(
    private newScenarioService: HavenNewScenarioService,
    private scenarioListService: HavenScenarioListService,
    private scenarioService: HavenScenarioService,
    public windowService: HavenWindowService) {
    this.configureButtonPositions();
  }

  configureButtonPositions() {
    const radius = 120;
    const step = (Math.PI / 2) / (this.buttons.length);
    let angle = step / 2;
    this.buttons.forEach((el) => {
      const x = Math.round(radius * Math.cos(angle));
      const y = Math.round(radius * Math.sin(angle));
      el.left = x + 'px';
      el.bottom = y + 'px';
      angle += step;
    });
  }

  toggleChartMenu() {
    this.mapMenuState = 'notactive';
    this.settingsMenuState = 'notactive';
    this.chartMenuState = (this.chartMenuState === 'active' ? 'notactive' : 'active');
    this.buttons.forEach(el => el.selected = false);
    this.buttons.find(x => x.text === 'Charts').selected = (this.chartMenuState === 'active') ? true : false;
  }

  toggleMapMenu() {
    this.chartMenuState = 'notactive';
    this.settingsMenuState = 'notactive';
    this.mapMenuState = (this.mapMenuState === 'active' ? 'notactive' : 'active');
    this.buttons.forEach(el => el.selected = false);
    this.buttons.find(x => x.text === 'Maps').selected = (this.mapMenuState === 'active') ? true : false;

  }

  toggleSettingsMenu() {
    this.chartMenuState = 'notactive';
    this.mapMenuState = 'notactive';
    this.settingsMenuState = (this.settingsMenuState === 'active' ? 'notactive' : 'active');
    this.buttons.forEach(el => el.selected = false);
    this.buttons.find(x => x.text === 'Settings').selected = (this.settingsMenuState === 'active') ? true : false;
  }


}
