import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AuthService } from '@app/haven-core';

export const DataColorOrder = {
  Fossil: {
    color: '#e41a1c',
    order: 3,
  },
  'Wind Offshore': {
    color: '#377eb8',
    order: 2,
  },
  Wind: {
    color: '#984ea3',
    order: 1,
  },
  DER: {
    color: '#ff7f00',
    order: 4,
  },
  'Battery Load': {
    color: '#f781bf',
    order: 9,
  },
  'Battery Generation': {
    color: '#999999',
    order: 8,
  },
  Bio: {
    color: '#4daf4a',
    order: 5,
  },
  PV: {
    color: '#ffe22b',
    order: 0,
  },
  Hydro: {
    color: '#5F4690',
    order: 7,
  },
  Geo: {
    color: '#a65628',
    order: 6,
  },
  Demand: {
    color: 'black',
    order: 10
  }
}

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
              data.push({
                name: technology,
                color: DataColorOrder[technology].color,
                order: DataColorOrder[technology].order,
                x: [],
                y: []
              });
            }
            object = data.find(el => el.name === technology);
            object.x.push(Number(year));
            object.y.push(Number(years[year][technology]));
          });
        });
        data.sort((a, b) => b.order - a.order);
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
            if (technology === 'Demand') return;
            let object = data.find(el => el.name === technology);
            if (!object) {
              data.push({
                name: technology,
                color: DataColorOrder[technology].color,
                order: DataColorOrder[technology].order,
                x: [],
                y: []
              });
            }
            object = data.find(el => el.name === technology);
            object.x.push(Number(hour));
            object.y.push(Number(years[year][6][15][hour][technology]));
          });
        });
        data.sort((a, b) => b.order - a.order);
        resolve(data);
      });
    });
  }

  public getLoad(scenarioId: string, year: number): Promise<any> {
    return new Promise(resolve => {
      return this.getGenerationData(scenarioId).then(years => {
        const data = [];
        Object.keys(years[year][6][15]).forEach(hour => {
          Object.keys(years[year][6][15][hour]).forEach(technology => {
            if (technology !== 'Demand') return;
            let object = data.find(el => el.name === technology);
            if (!object) {
              data.push({
                name: technology,
                color: DataColorOrder[technology].color,
                order: DataColorOrder[technology].order,
                x: [],
                y: []
              });
            }
            object = data.find(el => el.name === technology);
            object.x.push(Number(hour));
            object.y.push(Number(years[year][6][15][hour][technology]));
          });
        });
        data.sort((a, b) => b.order - a.order);
        resolve(data);
      });
    });
  }

}
