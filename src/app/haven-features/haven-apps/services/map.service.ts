import { Injectable } from '@angular/core';
import { AuthService } from '@app/haven-core';
import * as firebase from 'firebase';

import * as L from 'leaflet';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  scenarioLayers = {};


  constructor(private authService: AuthService) { }

  public getLayers(scenarioId: string): Promise<any> {
    return new Promise(resolve => {
      firebase.firestore().collection(`users/${this.authService.getUserId()}/scenarios/${scenarioId}/layers`).onSnapshot(snapshot => {
        const tasks = [];
        this.scenarioLayers[scenarioId] = [];
        snapshot.forEach(layer => {
          const name = layer.data().name;
          const storageLocation = `users/${this.authService.getUserId()}/scenarios/${scenarioId}/layers/${name}`;
          const task = firebase.storage().ref(storageLocation).getDownloadURL().then((url) => {
            return new Promise(resolve => {
              const xhr = new XMLHttpRequest();
              xhr.responseType = 'json';
              xhr.onload = (event) => {
                const data = JSON.parse(JSON.stringify(xhr.response));
                this.scenarioLayers[scenarioId].push({
                  name,
                  color: layer.data().color,
                  data
                });
                resolve(true);
              };
              xhr.open('GET', url);
              xhr.send();
            })

          });
          tasks.push(task);
        });
        Promise.all([...tasks]).then(() => {
          resolve(this.scenarioLayers[scenarioId]);
        });
      });
    });


  }
}
