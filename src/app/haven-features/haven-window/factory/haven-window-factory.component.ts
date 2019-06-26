import { Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { HavenWindowHostDirective } from '../directives/haven-window-host.directive';

import { HavenWindowService } from '../services/haven-window.service';
import { HavenWindowComponent } from '../component/haven-window.component';
import { HavenWindow } from '../shared/haven-window';

@Component({
  selector: 'app-haven-window-factory',
  templateUrl: './haven-window-factory.component.html',
  styleUrls: ['./haven-window-factory.component.css']
})
export class HavenWindowFactoryComponent implements OnInit {

  @ViewChild(HavenWindowHostDirective, {static: true}) havenWindowHost: HavenWindowHostDirective;
  havenWindowComponentList: {} = {};

  constructor(private havenWindowService: HavenWindowService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.havenWindowService.HavenWindowAdd.subscribe(havenWindow => { this.addWindow(havenWindow); });
    this.havenWindowService.HavenWindowRemove.subscribe(havenWindow => { this.removeWindow(havenWindow); });
  }

  addWindow(havenWindow: HavenWindow) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HavenWindowComponent);
    const viewContainerRef = this.havenWindowHost.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as HavenWindowComponent).id = havenWindow.id;
    (componentRef.instance as HavenWindowComponent).left = havenWindow.left;
    (componentRef.instance as HavenWindowComponent).top = havenWindow.top;
    (componentRef.instance as HavenWindowComponent).width = havenWindow.width;
    (componentRef.instance as HavenWindowComponent).height = havenWindow.height;
    (componentRef.instance as HavenWindowComponent).name = havenWindow.name;
    (componentRef.instance as HavenWindowComponent).color = havenWindow.color;
    (componentRef.instance as HavenWindowComponent).appType = havenWindow.appType;
    (componentRef.instance as HavenWindowComponent).query = havenWindow.query;
    (componentRef.instance as HavenWindowComponent).scenario = havenWindow.scenario;
    this.havenWindowComponentList[havenWindow.id] = componentRef;
  }

  removeWindow(havenWindow: HavenWindow) {
    this.havenWindowComponentList[havenWindow.id].destroy();
    delete this.havenWindowComponentList[havenWindow.id];
  }

}
