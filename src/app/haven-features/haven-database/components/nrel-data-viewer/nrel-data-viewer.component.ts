import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as firebase from 'firebase';
import { NrelDatabaseService } from '../../services/nrel-database/nrel-database.service';
import { promise } from 'protractor';

export interface NrelDataScheme {
  inputs: {
    email: string,
    password: string,
    model_uuid: string,
    scenario_id: number
  };
  message: string;
  models: {
    name: string,
    uuid: string
  }[],
  scenario_data: {
    timeseries_meta: any,
    stations: StationsElement[],
    capacity_generation: any,
  }
  scenarios: { id: string, name: string }[],
  selected_model_name: string
  selected_scenario_name: string
}
export interface StationsElement {
  location_1__name: string;
  location_2__name: number;
  technology__name: number;
}

export interface CapacityElement {
  capacity: number;
  generation: number[];
  location: string;
  technology: string;
}

@Component({
  selector: 'app-nrel-data-viewer',
  templateUrl: './nrel-data-viewer.component.html',
  styleUrls: ['./nrel-data-viewer.component.css']
})
export class NrelDataViewerComponent {

  minYear: number;
  maxYear: number;

  stationsColumns: string[] = ['technology', 'location_1', 'location_2'];
  stationsSource: StationsElement[];

  capacityColumns: string[] = ['technology', 'location', 'capacity'];
  capacitySource: CapacityElement[];

  constructor(
    public dialogRef: MatDialogRef<NrelDataViewerComponent>,
    private nrelService: NrelDatabaseService,
    @Inject(MAT_DIALOG_DATA) public data: NrelDataScheme) {

      console.log(data);

    let timeStamps = [];
    Object.keys(data['scenario_data']['timeseries_meta']).forEach(el => {
      timeStamps.push(...data['scenario_data']['timeseries_meta'][el]);
    })
    timeStamps = timeStamps.map(date => new Date(date));
    const min = timeStamps.reduce((a, b) => a < b ? a : b);
    const max = timeStamps.reduce((a, b) => a > b ? a : b);
    this.minYear = new Date(min).getFullYear();
    this.maxYear = new Date(max).getFullYear();
    this.stationsSource = data['scenario_data']['stations'];
    this.capacitySource = data['scenario_data']['capacity_generation'][2018];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

// Object
