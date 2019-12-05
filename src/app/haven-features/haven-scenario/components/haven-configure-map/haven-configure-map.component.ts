import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Scenario } from '../../services/haven-scenario.service';

import * as L from 'leaflet';
import { MapService } from '@app/haven-features/haven-apps/services/map.service';

@Component({
  selector: 'app-haven-configure-map',
  templateUrl: './haven-configure-map.component.html',
  styleUrls: ['./haven-configure-map.component.css']
})
export class HavenConfigureMapComponent implements OnInit {

  colors = [
    { value: '#E17C05' },
    { value: '#CC503E' },
    { value: '#38A6A5' },
    { value: '#6C698D' },
    { value: '#0F8554' },
    { value: '#994E95' },
  ];

  selectedColor = null;

  options = {
    layers: [
    ],
    zoom: 9,
    center: L.latLng(0, 0)
  };

  layersControl = {
    overlays: {}
  };

  loaded = false;
  leafletMap: L.Map;
  scenario: Scenario;
  layers: any;
  selectedLayer: any;

  latitude: number;
  longitude: number;
  zoom: number;

  constructor(
    public dialogRef: MatDialogRef<HavenConfigureMapComponent>, @Inject(MAT_DIALOG_DATA) public data: Scenario, private mapService: MapService) {
    this.scenario = data;
    this.latitude = this.scenario.latitude;
    this.longitude = this.scenario.longitude;
    this.zoom = this.scenario.zoom;

    this.mapService.getLayers(this.scenario.id).then(layers => {
      this.layers = [];
      layers.forEach(layer => {
        this.layersControl.overlays[layer.name] = L.geoJSON(layer.data, {
          style: {
            color: layer.color,
            fillColor: layer.color,
            fillOpacity: 0.75
          }
        });
        this.layers.push({ name: layer.name, color: layer.color, geojson: this.layersControl.overlays[layer.name] });
      });
      this.latitude = this.scenario.latitude;
      this.loaded = true;
    });
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setMap(leafletMap: any) {
    this.leafletMap = leafletMap;
    this.options.center = L.latLng(this.scenario.latitude, -this.scenario.longitude);
    this.leafletMap.panTo(L.latLng(this.scenario.latitude, -this.scenario.longitude));
    this.leafletMap.addLayer(L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: '...' }));
    this.leafletMap.invalidateSize();
    this.leafletMap.on('moveend', (event) => {
      this.latitude = Number(L.latLng(this.leafletMap.getCenter()).lat.toFixed(4));
      this.longitude = Number(L.latLng(this.leafletMap.getCenter()).lng.toFixed(4));
      this.zoom = this.leafletMap.getZoom();
    });
    this.leafletMap.on('zoomend', (event) => {
      this.latitude = Number(L.latLng(this.leafletMap.getCenter()).lat.toFixed(4));
      this.longitude = Number(L.latLng(this.leafletMap.getCenter()).lng.toFixed(4));
      this.zoom = this.leafletMap.getZoom();
    });
  }

  updateLatLngZoom() {
    this.latitude = Number(L.latLng(this.leafletMap.getCenter()).lat.toFixed(4));
    this.longitude = Number(L.latLng(this.leafletMap.getCenter()).lng.toFixed(4));
    this.zoom = this.leafletMap.getZoom();
  }

  centerOnLayer(event: any) {
    this.selectedLayer = event.value;
    this.leafletMap.fitBounds(event.value.geojson.getBounds());
  }

  changeLayerColor(color: any) {
    this.selectedColor = color;
  }

  changeLatLong(latitude: number, long: number) {

  }

  changeZoom(zoom: number) {

  }

}
