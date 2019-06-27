import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Scenario } from '../../services/haven-scenario.service';
import * as firebase from 'firebase';

export interface MapLayer {
  name: string;
  color: string;
  lastUpdate: any;
  scenarioId: string;
}

@Component({
  selector: 'app-haven-new-layer',
  templateUrl: './haven-new-layer.component.html',
  styleUrls: ['./haven-new-layer.component.css']
})
export class HavenNewLayerComponent {

  layerForm: FormGroup;

  @ViewChild('layerInput', { static: true }) layerInputDiv: ElementRef;

  layerFileName = 'Layer File';


  colors = [
    { value: '#E17C05' },
    { value: '#CC503E' },
    { value: '#38A6A5' },
    { value: '#6C698D' },
    { value: '#0F8554' },
    { value: '#994E95' },
  ];
  selectedColor = this.colors[0].value;


  constructor(
    public dialogRef: MatDialogRef<HavenNewLayerComponent>,

    @Inject(MAT_DIALOG_DATA) public data: Scenario) {
    this.selectedColor = data.color;
    this.layerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      color: new FormControl(this.selectedColor, [Validators.required]),
      layerFile: new FormControl('', [Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeColor(color: string) {
    this.selectedColor = color;
    this.layerForm.patchValue({ color: this.selectedColor });
  }

  layerFileChange() {
    this.layerFileName = this.layerInputDiv.nativeElement.files[0].name;
    this.layerForm.patchValue({layerFile: this.layerInputDiv.nativeElement.files[0]});
  }


  submitForm() {
    console.log(this.data);
    const layerDoc = {
      scenarioId: this.data.id,
      name: this.layerForm.controls[`name`].value,
      color: this.layerForm.controls[`color`].value,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    } as MapLayer;

    const result = {
      layerDoc,
      file: this.layerForm.controls[`layerFile`].value,
    };
    this.dialogRef.close(result);
  }

}
