import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as firebase from 'firebase';

import { AuthService } from '@app/haven-core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MapLayer, HavenNewLayerComponent } from '../../components/haven-new-layer/haven-new-layer.component';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class HavenNewLayerService {

  constructor(private authService: AuthService, private dialog: MatDialog, private storage: AngularFireStorage, private snackBar: MatSnackBar ) { }

  openDialog(scenario: any): void {
    const dialogRef = this.dialog.open(HavenNewLayerComponent, {
      width: '600px',
      data: scenario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.uploadLayer(result.layerDoc, result.file);
      }
    });
  }

  uploadLayer(layer: MapLayer, layerFile: File) {

    layer.lastUpdate = firebase.firestore.FieldValue.serverTimestamp();

    const layerPath = `users/${this.authService.getUserId()}/scenarios/${layer.scenarioId}/layers/${layer.name}`;

    const layerFileTask = this.storage.upload(layerPath, layerFile).then(() => {
      firebase.firestore().collection(`users/${this.authService.getUserId()}/scenarios/${layer.scenarioId}/layers`).add(layer).then(() => {
        this.snackBar.open(`Layer Added`, '', {
          duration: 2000,
          verticalPosition: 'top'
        });
      });
    });

  }
}
