import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AuthService } from '@app/haven-core';

@Injectable({
  providedIn: 'root'
})
export class HavenDatabaseService {

  capacityData = {};

  constructor(private authService: AuthService) {

  }

  getCapacityData(scenarioId: string): Promise<any> {
    return new Promise(async resolve => {
      if (!this.capacityData.hasOwnProperty(scenarioId)) {
        const querySnapshot = await firebase.database()
          .ref(`users/${this.authService.getUserId()}/scenarios/${scenarioId}/capacity`).once('value');
        this.capacityData[scenarioId] = {};
        const data = {};

        querySnapshot.forEach(el => {
          const year = el.key;
          data[year] = el.val();
        });
        this.capacityData[scenarioId] = data;
        resolve(this.capacityData[scenarioId]);
      } else {

        resolve(this.capacityData);
      }
    });
  }

  getGenerationData(scenarioId: string): Promise<any> {
    return new Promise(async resolve => {
      if (!this.capacityData.hasOwnProperty(scenarioId)) {
        const querySnapshot = await firebase.database()
          .ref(`users/${this.authService.getUserId()}/scenarios/${scenarioId}/generation`).once('value');
        this.capacityData[scenarioId] = {};
        const data = {};

        querySnapshot.forEach(el => {
          const year = el.key;
          data[year] = el.val();
        });
        this.capacityData[scenarioId] = data;
        resolve(this.capacityData[scenarioId]);
      } else {

        resolve(this.capacityData);
      }
    });
  }

}
