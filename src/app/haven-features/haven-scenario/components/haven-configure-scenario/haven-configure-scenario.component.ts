import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../haven-configure-scenario/haven-configure-scenario.component';
import { Scenario } from '../../services/haven-scenario.service';
import * as firebase from 'firebase';
import { HavenNewLayerService } from '../../services/haven-new-layer/haven-new-layer.service';

export interface DialogData {
  name: string;
  color: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-haven-configure-scenario',
  templateUrl: './haven-configure-scenario.component.html',
  styleUrls: ['./haven-configure-scenario.component.css']
})
export class HavenConfigureScenarioComponent {


  scenarioForm: FormGroup;

  colors = [
    { value: '#21897E' },
    { value: '#5386E4' },
    { value: '#88498F' },
    { value: '#DD6E42' },
    { value: '#6C698D' },
  ];
  selectedColor = this.colors[0].value;


  constructor(
    public dialogRef: MatDialogRef<HavenConfigureScenarioComponent>,
    public newLayerService: HavenNewLayerService,

    @Inject(MAT_DIALOG_DATA) public data: Scenario) {
    this.selectedColor = data.color;
    this.scenarioForm = new FormGroup({
      name: new FormControl(data.name, [Validators.required]),
      color: new FormControl(this.selectedColor, [Validators.required]),
      latitude: new FormControl(data.latitude, [Validators.required]),
      longitude: new FormControl(data.longitude, [Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeColor(color: string) {
    this.selectedColor = color;
    this.scenarioForm.patchValue({ color: this.selectedColor });
  }

  submitForm() {
    console.log(this.data);
    const updateScenario = {
      name: this.scenarioForm.controls[`name`].value,
      color: this.scenarioForm.controls[`color`].value,
      latitude: this.scenarioForm.controls[`latitude`].value,
      longitude: this.scenarioForm.controls[`longitude`].value,
      id: this.data.id,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    } as Scenario;

    const result = {
      updateScenario,
    };
    this.dialogRef.close(result);
  }

  addNewLayer() {
    this.newLayerService.openDialog(this.data);
  }

}
