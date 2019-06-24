import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as firebase from 'firebase';

import { HavenNewScenarioComponent } from '../../components/haven-new-scenario/haven-new-scenario.component';
import { AuthService } from '@app/haven-core';
import { Scenario } from '../../shared/scenario';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
@Injectable({
  providedIn: 'root'
})
export class HavenNewScenarioService {

  constructor(
    private dialog: MatDialog,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private afStore: AngularFirestore,
    private afFuncs: AngularFireFunctions) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(HavenNewScenarioComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.uploadNewScenario(result.newScenario, result.capFile, result.genFile, result.stationsFile);
      }
    });
  }

  uploadNewScenario(newScenario: Scenario, capFile: File, genFile: File, stationsFile: File) {
    newScenario.id = this.afStore.createId();
    newScenario.lastUpdate = firebase.firestore.FieldValue.serverTimestamp();
    newScenario.creationDate = firebase.firestore.FieldValue.serverTimestamp();
    newScenario.endYear = 2018;
    newScenario.startYear = 2018;

    const capFilePath = `users/${this.authService.getUserId()}/scenarios/${newScenario.id}/rawcapacity.csv`;
    const genFilePath = `users/${this.authService.getUserId()}/scenarios/${newScenario.id}/rawgeneration.csv`;
    const stationFilePath = `users/${this.authService.getUserId()}/scenarios/${newScenario.id}/rawstation.csv`;

    const firestoreTask = firebase.firestore().collection(`users/${this.authService.getUserId()}/scenarios/`).doc(newScenario.id).set(newScenario);
    const capTask = this.storage.upload(capFilePath, capFile);
    const genTask = this.storage.upload(genFilePath, genFile);
    const stationsTask = this.storage.upload(stationFilePath, stationsFile);
    Promise.all([capTask, genTask, stationsTask, firestoreTask]).then(result => {
      this.processNewScenario(newScenario.id).then((success) => {
        console.log(success);
      });
      firebase.firestore().collection(`users/${this.authService.getUserId()}/scenarios/`).doc(newScenario.id).onSnapshot(doc => {
        console.log(doc.data().progress);
      });
    });
  }

  private async processNewScenario(scenarioId: string): Promise<any> {
    try {
      const parseNewScenario = this.afFuncs.httpsCallable('parseNewScenario');
      const data = await parseNewScenario({ scenarioId }).toPromise() as Promise<any>;
      return Promise.resolve(data);
    } catch (error) {
      console.log('parseNewScenario Error: ', error);
      return Promise.resolve(null);
    }
  }
}
