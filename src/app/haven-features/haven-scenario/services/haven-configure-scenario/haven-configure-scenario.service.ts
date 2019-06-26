import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as firebase from 'firebase';

import { AuthService } from '@app/haven-core';
import { Scenario } from '../haven-scenario.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { HavenConfigureScenarioComponent } from '../../components/haven-configure-scenario/haven-configure-scenario.component';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HavenConfigureScenarioService {

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  openDialog(scenario: any): void {
    const dialogRef = this.dialog.open(HavenConfigureScenarioComponent, {
      width: '500px',
      data: scenario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateScenario(result.updateScenario);
      }
    });
  }

  updateScenario(scenarioUpdate: any) {
    console.log(scenarioUpdate);
    firebase.firestore().collection(`users/${this.authService.getUserId()}/scenarios/`).doc(scenarioUpdate.id).update(scenarioUpdate).then(() => {
      this.snackBar.open(`Scenario Updated`, '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    })
  }
}
