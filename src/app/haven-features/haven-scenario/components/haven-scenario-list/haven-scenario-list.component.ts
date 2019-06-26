import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Scenario, HavenScenarioService, } from '../../services/haven-scenario.service';
import { Subscription } from 'rxjs';
import { HavenConfigureScenarioService } from '../../services/haven-configure-scenario/haven-configure-scenario.service';

import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-haven-scenario-list',
  templateUrl: './haven-scenario-list.component.html',
  styleUrls: ['./haven-scenario-list.component.css']
})
export class HavenScenarioListComponent implements OnInit, OnDestroy {

  scenarios: Scenario[] = [];
  scenariosSubscriber: Subscription;

  constructor(
    public dialogRef: MatDialogRef<HavenScenarioListComponent>,
    private scenarioService: HavenScenarioService,
    private configureScenarioService: HavenConfigureScenarioService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.scenariosSubscriber = this.scenarioService.availableScenariosSubject.subscribe(value => {
      this.scenarios = value;
    });
  }

  ngOnDestroy() {
    this.scenariosSubscriber.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  configureScenario(scenario: Scenario) {
    this.configureScenarioService.openDialog(scenario);
  }

  deleteScenario(scenarioId: string) {
    this.scenarioService.deleteScenario(scenarioId).then((success) => {
      this.snackBar.open(`Scenario Deleted`, '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    });
  }


}
