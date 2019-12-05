import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as firebase from 'firebase';
import { NrelDatabaseService } from '../../services/nrel-database/nrel-database.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-nrel-data-dialog',
  templateUrl: './nrel-data-dialog.component.html',
  styleUrls: ['./nrel-data-dialog.component.css']
})
export class NrelDataDialogComponent {

  scenarioForm: FormGroup;
  loaded = false;
  nrelData = [];

  constructor(
    public dialogRef: MatDialogRef<NrelDataDialogComponent>,
    private nrelService: NrelDatabaseService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.scenarioForm = new FormGroup({
    });

    this.nrelService.getModels().then(models => {
      const prom = [];
      models.forEach(model => {
        const nrelModel = {
          id: model['uuid'],
          name: model['name']
        };
        this.nrelData.push(nrelModel);
        prom.push(this.nrelService.getScenario(model['uuid']));
      });
      Promise.all([...prom]).then(scenarios => {
        for (let i = 0; i < scenarios.length; i++) {
          this.nrelData[i]['scenarios'] = scenarios[i];
        }
        this.loaded = true;
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    this.dialogRef.close(null);
  }

  downloadData(modelId: string, scenarioId) {
    this.nrelService.getData(modelId, scenarioId).then(data => {
      this.dialogRef.close(data);
    });
  }

}
