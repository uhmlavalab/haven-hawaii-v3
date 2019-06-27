import { Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentRef, Input, ComponentFactory } from '@angular/core';

import { ChartMenuComponent } from '../components/chart-menu/chart-menu.component';
import { MapMenuComponent } from '../components/map-menu/map-menu.component';
import { HavenAppMenuHostDirective } from './app-menu-factory-host.directive';
import { Scenario } from '@app/haven-features/haven-scenario';

export enum AppType {
  plotly = 'plotly',
  leaflet = 'leaflet'
}


@Component({
  selector: 'app-menu-factory',
  templateUrl: './app-menu-factory.component.html',
  styleUrls: ['./app-menu-factory.component.css']
})
export class AppMenuFactoryComponent implements OnInit {

  @ViewChild(HavenAppMenuHostDirective, { static: true }) havenAppMenuHost: HavenAppMenuHostDirective;
  @Input() appType: AppType;
  @Input() query: any;
  @Input() id: string;
  @Input() scenario: Scenario;
  @Input() lock: boolean;

  appRef: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.addApp();
  }

  addApp() {
    let componentFactory = null;
    if (this.appType === AppType.leaflet) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(MapMenuComponent);
    } else {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(ChartMenuComponent);
    }
    const viewContainerRef = this.havenAppMenuHost.viewContainerRef;
    this.appRef = viewContainerRef.createComponent(componentFactory);
    this.appRef.instance.id = this.id;
    this.appRef.instance.query = this.query;
    this.appRef.instance.scenario = this.scenario;
  }

}
