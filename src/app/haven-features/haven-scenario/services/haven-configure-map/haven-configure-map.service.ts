import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as firebase from 'firebase';

import { AuthService } from '@app/haven-core';
import { HavenConfigureMapComponent } from '../../components/haven-configure-map/haven-configure-map.component';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HavenConfigureMapService {

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  openDialog(scenario: any): void {
    const dialogRef = this.dialog.open(HavenConfigureMapComponent, {
      width: '80vw',
      data: scenario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateScenario(result.updateScenario);
      }
    });
  }

  updateScenario(scenarioUpdate: any) {
    // firebase.firestore().collection(`users/${this.authService.getUserId()}/scenarios/`).doc(scenarioUpdate.id).update(scenarioUpdate).then(() => {
    //   this.snackBar.open(`Scenario Updated`, '', {
    //     duration: 2000,
    //     verticalPosition: 'top'
    //   });
    // })
  }
}
