import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Scenario } from '@app/haven-features/haven-scenario';
import { MapType } from '../../haven-apps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  id: string;
  scenario: Scenario;
  query: any;

  loaded = false;
  leafletMap: L.Map;

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
    this.options.center = L.latLng(this.scenario.latitude, -this.scenario.longitude);
    switch (this.query.data.type) {
      case MapType.satellite:
        this.leafletMap.addLayer(L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: '...' }));
        break;
      case MapType.street:
        this.leafletMap.addLayer(L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }));
        break;
      case MapType.terrain:
        this.leafletMap.addLayer(L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { maxZoom: 17, attribution: '...' }));
        break;
    }
    this.leafletMap.panTo(this.options.center);
  }

  public resize() {
    this.leafletMap.invalidateSize();
  }
}
