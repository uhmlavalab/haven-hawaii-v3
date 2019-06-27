import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AuthService } from '@app/haven-core';
import { BehaviorSubject } from 'rxjs';

export class RenewablePercents {
  scenarioInfo: Scenario;
  percents: { year: number, percent: number }[];
}

export interface Scenario {
  id: string;
  name: string;
  endYear: number;
  startYear: number;
  creationDate: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
  lastUpdate: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
  color: string;
  latitude: number;
  longitude: number;
}




@Injectable({
  providedIn: 'root'
})
export class HavenScenarioService {

  private availableScenarios: Scenario[] = [];
  public availableScenariosSubject = new BehaviorSubject<Scenario[]>(this.availableScenarios);

  private activeScenarios: Scenario[] = [];
  public activeScenariosSubject = new BehaviorSubject<Scenario[]>(this.activeScenarios);

  private renewablePercents: RenewablePercents[] = [];
  public renewablePercentSubject = new BehaviorSubject<RenewablePercents[]>(this.renewablePercents);

  private selectedScenario = '';

  private activeYear: number;
  public activeYearSubject = new BehaviorSubject<number>(this.activeYear);

  constructor(private authService: AuthService) {
    this.getAvailableScenarios();

  }

  private getAvailableScenarios() {
    firebase.firestore().collection(`users/${this.authService.getUserId()}/scenarios`).onSnapshot(querySnapshot => {
      this.availableScenarios = [];
      querySnapshot.forEach(doc => {
        if (doc.data().progress === 100) {
          this.availableScenarios.push(doc.data() as Scenario);
        }
      });
      this.availableScenariosSubject.next(this.availableScenarios);
      this.updateRenewable();
    });
  }

  public addScenarioToActive(scenarioId: string) {
    const scenario = this.availableScenarios.find(el => el.id === scenarioId);
    if (scenario) {
      this.activeScenarios.push(scenario);
    }
    this.activeScenariosSubject.next(this.activeScenarios);
  }

  public removeScenarioFromActive(scenarioId: string) {
    const scenario = this.activeScenarios.find(el => el.id === scenarioId);
    if (scenario) {
      this.activeScenarios = this.activeScenarios.filter((el) => el.id !== scenario.id);
    }
    this.activeScenariosSubject.next(this.activeScenarios);
  }

  public getScenario(scenarioId: string): Scenario {
    return this.availableScenarios.find(el => el.id === scenarioId);
  }

  public getAllScenarios(): Scenario[] {
    return this.availableScenarios;
  }


  private async updateRenewable() {
    const tasks = [] as any[];
    let update = false;
    const updateData = [];
    this.availableScenarios.forEach(el => {
      const renewSceanrio = this.renewablePercents.find(x => x.scenarioInfo.id === el.id);
      if (renewSceanrio !== undefined) {
        renewSceanrio.scenarioInfo = el;
        updateData.push(renewSceanrio);
        return;
      }
      update = true;
      const percentData = { scenarioInfo: el, percents: [] } as RenewablePercents;
      updateData.push(percentData);
      const task = firebase.database().ref(`users/${this.authService.getUserId()}/scenarios/${el.id}/renewablepercent`)
        .once('value').then(snapshot => {
          snapshot.forEach(doc => {
            percentData.percents.push({ year: Number(doc.key), percent: doc.val().percent });
          });
          this.renewablePercents.push(percentData);
        });
      tasks.push(task);
    });
    await Promise.all([...tasks]);
    this.renewablePercents = updateData;
    this.renewablePercentSubject.next(this.renewablePercents);
  }

  setSelectedScenario(scenarioId: string) {
    this.selectedScenario = scenarioId;
  }

  getSelectedScenario(): Scenario {
    return this.availableScenarios.find(el => el.id === this.selectedScenario);
  }

  setActiveYear(year: number) {
    this.activeYear = year;
    this.activeYearSubject.next(this.activeYear);
  }

  getActiveYear(): number {
    return this.activeYear;
  }

  getScenarioREValues(scenarioId: string) {
    return this.renewablePercents.find(el => el.scenarioInfo.id === scenarioId);
  }

  getScenarioReference(scenarioId: string): firebase.firestore.DocumentReference {
    return firebase.firestore().doc(`users/${this.authService.getUserId()}/scenarios/${scenarioId}/`);

  }

  async deleteScenario(scenarioId: string): Promise<any> {
    const tasks = [];
    tasks.push(firebase.storage().ref(`users/${this.authService.getUserId()}/scenarios/${scenarioId}/rawcapacity.csv`).delete());
    tasks.push(firebase.storage().ref(`users/${this.authService.getUserId()}/scenarios/${scenarioId}/rawgeneration.csv`).delete());
    tasks.push(firebase.storage().ref(`users/${this.authService.getUserId()}/scenarios/${scenarioId}/rawstation.csv`).delete());
    tasks.push(firebase.database().ref(`users/${this.authService.getUserId()}/scenarios/${scenarioId}/`).remove());
    tasks.push(firebase.firestore().doc(`users/${this.authService.getUserId()}/scenarios/${scenarioId}/`).delete());
    const success = await Promise.all([...tasks]);
    return Promise.resolve(true);
  }
}

