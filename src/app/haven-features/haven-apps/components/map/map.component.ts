import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  loaded = false;
  id: string;
  leafletMap: L.Map;
  query: any;

  options = {
    layers: [
    ],
    zoom: 9,
    center: L.latLng(0, 0)
  };

  constructor() { }

  ngOnInit() {
    this.loaded = true;
  }

  setMap(leafletMap: any) {
    this.leafletMap = leafletMap;
    this.options.center = L.latLng(this.query.scenario.latitude, -this.query.scenario.longitude);
    console.log(this.query.data.type);
    switch (this.query.data.type) {
      case 0:
        this.leafletMap.addLayer(L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: '...' }));
        break;
      case 1:
        this.leafletMap.addLayer(L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }));
        break;
      case 2:
        this.leafletMap.addLayer(L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { maxZoom: 17, attribution: '...' }));
        break;
    }
    this.leafletMap.panTo(this.options.center);
  }

  public resize() {
    this.leafletMap.invalidateSize();
  }
}
