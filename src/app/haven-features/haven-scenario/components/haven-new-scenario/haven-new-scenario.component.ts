import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../haven-configure-scenario/haven-configure-scenario.component';
import { Scenario } from '../../services/haven-scenario.service';


@Component({
  selector: 'app-haven-new-scenario',
  templateUrl: './haven-new-scenario.component.html',
  styleUrls: ['./haven-new-scenario.component.css']
})
export class HavenNewScenarioComponent {

  scenarioForm: FormGroup;

  colors = [
    { value: '#21897E' },
    { value: '#5386E4' },
    { value: '#88498F' },
    { value: '#DD6E42' },
    { value: '#6C698D' },
  ];
  selectedColor = this.colors[0].value;

  genFileName = 'Generation File';
  capFileName = 'Capacity File';
  stationFileName = 'Stations File';

  @ViewChild('genInput', { static: true }) genInputDiv: ElementRef;
  @ViewChild('capInput', { static: true }) capFileDiv: ElementRef;
  @ViewChild('stationsInput', { static: true }) stationsFileDiv: ElementRef;


  constructor(
    public dialogRef: MatDialogRef<HavenNewScenarioComponent>,

    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.scenarioForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      color: new FormControl(this.selectedColor, [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
      generationFile: new FormControl('', [Validators.required]),
      capacityFile: new FormControl('', [Validators.required]),
      stationsFile: new FormControl('', [Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeColor(color: string) {
    this.selectedColor = color;
    this.scenarioForm.patchValue({color: this.selectedColor});
  }


  submitForm() {
    const newScenario = {
      name: this.scenarioForm.controls[`name`].value,
      color: this.scenarioForm.controls[`color`].value,
      latitude: this.scenarioForm.controls[`latitude`].value,
      longitude: this.scenarioForm.controls[`longitude`].value,
    } as Scenario;

    const result = {
      newScenario,
      genFile: this.scenarioForm.controls[`generationFile`].value,
      capFile: this.scenarioForm.controls[`capacityFile`].value,
      stationsFile: this.scenarioForm.controls[`stationsFile`].value,
    };
    this.dialogRef.close(result);
  }

  genFileChange() {
    this.genFileName = this.genInputDiv.nativeElement.files[0].name;
    this.scenarioForm.patchValue({generationFile: this.genInputDiv.nativeElement.files[0]});
  }

  capFileChange() {
    this.capFileName = this.capFileDiv.nativeElement.files[0].name;
    this.scenarioForm.patchValue({capacityFile: this.capFileDiv.nativeElement.files[0]});
  }

  stationFileChange() {
    this.stationFileName = this.stationsFileDiv.nativeElement.files[0].name;
    this.scenarioForm.patchValue({stationsFile: this.stationsFileDiv.nativeElement.files[0]});
  }

}
