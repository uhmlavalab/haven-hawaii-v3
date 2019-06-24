import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AuthService } from '@app/haven-core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HavenScenarioService {

  scenarios: any[] = [];
  renewablePercents: any[] = [];
  renewablePercentSubject = new Subject<any[]>();

  constructor(private authService: AuthService, private afStore: AngularFirestore) {
    this.getScenarios().then(() => {
      this.getRenewablePercents().then(() => {
        this.renewablePercentSubject.next(this.renewablePercents);
      });
    });
  }

  getScenario(scenaroId: string): Observable<any> {
    return this.afStore.collection('users').doc(this.authService.getUserId()).collection('scenarios').doc(scenaroId).valueChanges();
  }

  getAllScenarios(): Observable<any> {
    return this.afStore.collection('users').doc(this.authService.getUserId()).collection('scenarios').valueChanges();
  }

  getScenarios(): Promise<any> {
    return firebase.firestore().collection(`users/${this.authService.getUserId()}/scenarios`).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.scenarios.push(doc.data());
      });
      return Promise.resolve(true);
    });
  }

  getRenewablePercents(): Promise<any> {
    const tasks = [] as any[];
    this.scenarios.forEach(el => {
      const task = firebase.database().ref(`users/${this.authService.getUserId()}/scenarios/${el.id}/renewablepercent`).once('value');
      tasks.push(task);
    });
    return Promise.all([...tasks]).then(response => {
      for (let i = 0; i < response.length; i++) {
        const percentData = [];
        Object.keys(response[i].val()).forEach(year => {
          percentData.push({'year': Number(year), percent: response[i].val()[year].percent});
        })
        this.renewablePercents.push({ scenarioData: this.scenarios[i],  percents: percentData });
      }
  });
}

}

