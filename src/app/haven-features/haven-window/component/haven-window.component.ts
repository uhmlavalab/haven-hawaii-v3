import { Component, AfterContentInit, ViewChild, ElementRef } from '@angular/core';

import { HavenWindowService } from '@app/haven-core';

import { HavenWindow } from '../shared/haven-window';
import { viewClassName } from '@angular/compiler';
import { MatToolbar } from '@angular/material';


import * as L from 'leaflet';


@Component({
  selector: 'app-haven-window',
  templateUrl: './haven-window.component.html',
  styleUrls: ['./haven-window.component.css'],
  providers: []
})
export class HavenWindowComponent implements AfterContentInit {

  @ViewChild('windowDiv', { static: true }) windowDiv: ElementRef;
  @ViewChild('windowHeader', { static: true }) windowHeader: MatToolbar;
  @ViewChild('windowFooter', { static: true }) windowFooter: MatToolbar;

  drawerOpen = false;

  havenWindow: HavenWindow;

  leafletMap: L.Map;
  @ViewChild('chartDiv', { static: true }) chartDiv: ElementRef;
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 9,
    center: L.latLng(21.30, -157.85)
  };

  constructor(private havenWindowService: HavenWindowService) { }

  ngAfterContentInit() {
    this.setWindowInitialSettings();
    this.havenWindowService.WindowZUpdate.subscribe(windows => {
      this.windowDiv.nativeElement.style.zIndex = windows[this.havenWindow.id];
    });
  }

  setWindowInitialSettings() {
    this.windowDiv.nativeElement.style.width = this.havenWindow.size.width + 'px';
    this.windowDiv.nativeElement.style.height = this.havenWindow.size.height + 'px';
    this.windowDiv.nativeElement.style.left = this.havenWindow.position.left + 'px';
    this.windowDiv.nativeElement.style.top = this.havenWindow.position.top + 'px';
    this.windowDiv.nativeElement.style.zIndex = 100;
    this.havenWindowService.bringWindowForward(this.havenWindow.id);
  }

  removeWindow() {
    this.havenWindowService.removeWindow(this.havenWindow.id);
  }

  drawerToggle() {
    this.drawerOpen = !this.drawerOpen;
  }

  setMap(leafletMap: any) {
    this.leafletMap = leafletMap;

  }

}
