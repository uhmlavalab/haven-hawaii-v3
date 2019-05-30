import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

import * as L from 'leaflet';
import * as Plotly from 'plotly.js';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'haven-hawaii-v3';
  leafletMap: L.Map;
  @ViewChild('chart', {static: true}) chartDiv: ElementRef;
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 9,
    center: L.latLng(21.30, -157.85)
  };
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    const trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers',
      type: 'scatter'
    } as Plotly.PlotData;

    const trace2 = {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: 'lines',
      type: 'scatter'
    } as Plotly.PlotData;

    const trace3 = {
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers',
      type: 'scatter'
    } as Plotly.PlotData;

    const data = [trace1, trace2, trace3];
    Plotly.newPlot(this.chartDiv.nativeElement, data);
  }

  setMap(leafletMap: L.Map) {
    this.leafletMap = leafletMap;
  }
}
