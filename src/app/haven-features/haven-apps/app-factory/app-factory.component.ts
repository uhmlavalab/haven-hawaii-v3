import { Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentRef, Input, ComponentFactory } from '@angular/core';

import { ChartComponent } from '../components/chart/chart.component';
import { MapComponent } from '../components/map/map.component';
import { HavenAppHostDirective } from './app-factory-host.directive';

export enum AppType {
  plotly = 'plotly',
  leaflet = 'leaflet'
}


@Component({
  selector: 'app-factory',
  templateUrl: './app-factory.component.html',
  styleUrls: ['./app-factory.component.css']
})
export class AppFactoryComponent implements OnInit {

  @ViewChild(HavenAppHostDirective, { static: true }) havenAppHost: HavenAppHostDirective;
  @Input() appType: AppType;
  @Input() query: any;
  @Input() id: string;

  appRef: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.addApp();
  }

  addApp() {
    let componentFactory = null;
    if (this.appType === AppType.leaflet) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(MapComponent);
    } else {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(ChartComponent);
    }
    const viewContainerRef = this.havenAppHost.viewContainerRef;
    this.appRef = viewContainerRef.createComponent(componentFactory);
    this.appRef.instance.id = this.id;
    this.appRef.instance.query = this.query;
  }

  resize() {
    this.appRef.instance.resize();
  }

}
