import { Component, AfterContentInit, ViewChild, ElementRef } from '@angular/core';

import { HavenWindowService } from '../services/haven-window.service';

import { HavenWindow } from '../shared/haven-window';
import { MatToolbar } from '@angular/material';


import * as L from 'leaflet';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-haven-window',
  templateUrl: './haven-window.component.html',
  styleUrls: ['./haven-window.component.css'],
  providers: [],
  animations: [
    trigger('menuOpen', [
      state('notactive', style({ bottom: '-50px' })),
      state('active', style({ bottom: '-200px'})),
      transition('notactive <=> active', animate('750ms'))
    ]),
  ],

})
export class HavenWindowComponent extends HavenWindow implements AfterContentInit  {

  @ViewChild('windowDiv', { static: true }) windowDiv: ElementRef;
  @ViewChild('windowHeader', { static: true }) windowHeader: MatToolbar;
  @ViewChild('windowFooter', { static: true }) windowFooter: MatToolbar;

  drawerOpen = false;

  havenWindow: HavenWindow;
  colors = ['#21897E', '#5386E4', '#88498F', '#DD6E42', '#6C698D'];
  selectedColor: string;
  rpsPercent: number;

  menuState = 'notactive';

  leafletMap: L.Map;
  @ViewChild('chartDiv', { static: true }) chartDiv: ElementRef;
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 9,
    center: L.latLng(21.30, -157.85)
  };


  constructor(private havenWindowService: HavenWindowService) {
    super();
    this.rpsPercent = Math.floor(100 * Math.random());
    this.selectedColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    console.log(this.selectedColor)
   }

  ngAfterContentInit() {
    this.setWindowInitialSettings();
    this.havenWindowService.WindowZUpdate.subscribe(windows => {
      this.windowDiv.nativeElement.style.zIndex = windows[this.havenWindow.id];
    });
  }

  setWindowInitialSettings() {
    this.windowDiv.nativeElement.style.width = this.width + 'px';
    this.windowDiv.nativeElement.style.height = this.height + 'px';
    this.windowDiv.nativeElement.style.left = this.left + 'px';
    this.windowDiv.nativeElement.style.top = this.top + 'px';
    this.windowDiv.nativeElement.style.zIndex = 100;
    this.havenWindowService.bringWindowForward(this.id);
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

  toggleMenu() {
    console.log('hi');
    (this.menuState === 'active') ? this.menuState = 'notactive' : this.menuState = 'active';
  }

}


