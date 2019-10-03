import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Scenario } from '../../services/haven-scenario.service';
import * as firebase from 'firebase';

import { HavenLayerFillService } from '../../services/haven-layer-fill/haven-layer-fill.service';


export interface MapLayer {
  name: string;
  color: string;
  lastUpdate: any;
  scenarioId: string;
  properties: any;
}

class Operation {
  property: string;
  value: number;
  operand: string;
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

  customFill = false;
  tops = [];

  operations: Operation[] = [];

  currentOperation = '';
  currentOperationLiteral = '';

  layerProperties: any;
  properties = [];

  constructor(
    public dialogRef: MatDialogRef<HavenNewLayerComponent>,
    public layerFillService: HavenLayerFillService,

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
    this.layerForm.patchValue({ layerFile: this.layerInputDiv.nativeElement.files[0] });

    this.layerProperties = [];
    this.properties = [];
    this.operations = [];
    const mapFile = this.layerForm.controls[`layerFile`].value;
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const jsonFile = JSON.parse(fileReader.result as string);
      this.layerProperties = jsonFile.features[0].properties;
      this.properties.push("Custom Value");
      this.properties.push(...Object.keys(this.layerProperties));
    });
    fileReader.readAsText(mapFile);
  }


  submitForm() {
    const mapFile = this.layerForm.controls[`layerFile`].value;
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const jsonFile = JSON.parse(fileReader.result as string);

      const layerDoc = {
        scenarioId: this.data.id,
        name: this.layerForm.controls[`name`].value,
        color: this.layerForm.controls[`color`].value,
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        properties: jsonFile.features[0].properties,
        operations: this.operations
      } as MapLayer;

      const result = {
        layerDoc,
        file: mapFile,
      };

      this.dialogRef.close(result);


    });
    fileReader.readAsText(mapFile);

  }

  customFillChange(event) {
    this.customFill = event.checked;
  }

  submit() {
    this.dialogRef.close(this.operations);
  }

  selChange(event, op: Operation) {
    op.property = event.value;
    op.value = this.layerProperties[op.property];
    console.log(op.value);
    this.updateFullOperation();
  }

  operandChange(event, op: Operation) {
    op.operand = event.value;
    this.updateFullOperation();
  }

  updateFullOperation() {
    this.currentOperation = '';
    this.currentOperationLiteral = '';
    let count = 0;
    this.operations.forEach(el => {
      this.currentOperationLiteral += ` ${el.value.toString()} `;
      if (el.property === 'Custom Value') {
        this.currentOperation += ` ${el.value} `;
      } else {
        this.currentOperation += ` ${el.property} `;
      }
      if (count < this.operations.length - 1) {
        this.currentOperation += ` ${el.operand} `;
        this.currentOperationLiteral += ` ${el.operand} `;

      }
      count++;
    });
  }

  remove(index: number) {
    this.operations.splice(index, 1);
    this.updateFullOperation();
  }
  add() {
    const op = new Operation();
    op.property = this.properties[0];
    op.operand = '+';
    op.value = 0;
    this.operations.push(op);
    this.updateFullOperation();
  }

  customValChange(event, op: Operation) {
    op.value = event.target.value;
    this.updateFullOperation();
  }
}
