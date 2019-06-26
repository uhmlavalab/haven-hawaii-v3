import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AuthService } from '@app/haven-core';

@Injectable({
  providedIn: 'root'
})
export class HavenDatabaseService {

  capacityData = {};
  generationData = {};

  constructor(private authService: AuthService) {

  }

  private getCapacityData(scenarioId: string): Promise<any> {
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

        resolve(this.capacityData[scenarioId]);
      }
    });
  }

  private getGenerationData(scenarioId: string): Promise<any> {
    return new Promise(async resolve => {
      if (!this.generationData.hasOwnProperty(scenarioId)) {
        const querySnapshot = await firebase.database()
          .ref(`users/${this.authService.getUserId()}/scenarios/${scenarioId}/generation`).once('value');
        this.generationData[scenarioId] = {};
        const data = {};
        querySnapshot.forEach(el => {
          const year = el.key;
          data[year] = el.val();
        });
        this.generationData[scenarioId] = data;
        resolve(this.generationData[scenarioId]);
      } else {
        resolve(this.generationData[scenarioId]);
      }
    });
  }

  public getCapacity(scenarioId: string): Promise<any> {
    return new Promise(resolve => {
      return this.getCapacityData(scenarioId).then(years => {
        const data = [];
        Object.keys(years).forEach(year => {
          Object.keys(years[year]).forEach(technology => {
            let object = data.find(el => el.name === technology);
            if (!object) {
              data.push({ name: technology, x: [], y: [] });
            }
            object = data.find(el => el.name === technology);
            object.x.push(Number(year));
            object.y.push(Number(years[year][technology]));
          });
        });
        console.log(data);
        resolve(data);
      });
    });
  }

  public getGeneration(scenarioId: string, year: number): Promise<any> {
    return new Promise(resolve => {
      return this.getGenerationData(scenarioId).then(years => {
        const data = [];
        Object.keys(years[year][6][15]).forEach(hour => {
          Object.keys(years[year][6][15][hour]).forEach(technology => {
            let object = data.find(el => el.name === technology);
            if (!object) {
              data.push({ name: technology, x: [], y: [] });
            }
            object = data.find(el => el.name === technology);
            object.x.push(Number(hour));
            object.y.push(Number(years[year][6][15][hour][technology]));
          });
        });
        // Object.keys(years).forEach(year => {
        //   Object.keys(years[year]).forEach(month => {
        //     Object.keys(years[year][month]).forEach(day => {
        //       Object.keys(years[year][month][day]).forEach(hour => {
        //         Object.keys(years[year][month][day][hour]).forEach(technology => {
        //           let object = data.find(el => el.name === technology);
        //           if (!object) {
        //             data.push({ name: technology, x: [], y: [] });
        //           }
        //           object = data.find(el => el.name === technology);
        //           object.x.push(Number(year));
        //           object.y.push(Number(years[year][technology]));
        //         });
        //       });
        //     });
        //   });
        // });
        console.log(data);
        resolve(data);
      });
    });
  }

  public getLoad(scenarioId: string): Promise<any> {
    return new Promise(resolve => {
      return this.getGenerationData(scenarioId).then(years => {
        const data = [];
        console.log(years);
      });
    });
  }

}
