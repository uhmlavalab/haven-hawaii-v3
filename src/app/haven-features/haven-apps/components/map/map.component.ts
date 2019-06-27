import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Scenario, HavenScenarioService } from '@app/haven-features/haven-scenario';
import { MapType, HavenAppsService } from '../../haven-apps.service';
import { Subscription } from 'rxjs';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  id: string;
  scenario: Scenario;
  query: any;
  lock: boolean;
  lockSub: Subscription;

  year: number;
  yearSub: Subscription;

  loaded = false;
  leafletMap: L.Map;

  layersControl = {
    overlays: {}
  };

  options = {
    layers: [
    ],
    zoom: 9,
    center: L.latLng(0, 0)
  };

  constructor(private appService: HavenAppsService, private mapService: MapService, private scenarioService: HavenScenarioService) { }

  ngOnInit() {
    this.loaded = false;
    this.lockSub = this.appService.lockSub.subscribe(value => { if (value.id === this.id) { this.lock = value.lock; } });
    this.yearSub = this.scenarioService.activeYearSubject.subscribe(year => {
      this.year = year;
    });

    this.mapService.getLayers(this.scenario.id).then(layers => {
      layers.forEach(layer => {
        this.layersControl.overlays[layer.name] = L.geoJSON(layer.data, {
          style: {
            color: layer.color,
            fillColor: layer.color,
            fillOpacity: 0.75
          }
        });
      });
      this.loaded = true;
    });
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

  ngOnDestroy(): void {
    this.lockSub.unsubscribe();
    this.yearSub.unsubscribe();

  }
}
