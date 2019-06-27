import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ChartType {
  'capacity',
  'load',
  'generation'
}

export enum MapType {
  'satellite',
  'street',
  'terrain'
}

@Injectable({
  providedIn: 'root'
})
export class HavenAppsService {

  appSubjects = {};

  appDataSubjects = {};

  lockSub = new BehaviorSubject<{id: string, lock: boolean}>({ id: null, lock: false});
  constructor() {

  }

  addAppDataSubject(id: string) {
    if (this.appDataSubjects[id] === undefined) {
      this.appDataSubjects[id] = new BehaviorSubject<any>({});
    }
  }

  removeAppDataSubject(id: string) {
    delete this.appDataSubjects[id];
  }

  getAppDataSubject(id: string): BehaviorSubject<any> {
    this.addAppDataSubject(id);
    return this.appDataSubjects[id];
  }

  postAppDataInfo(id: any, data: any) {
    this.appDataSubjects[id].next(data);
  }

  addAppSubject(id: string) {
    if (this.appSubjects[id] === undefined) {
      this.appSubjects[id] = new BehaviorSubject<any>({});
    }
  }

  removeAppSubject(id: string) {
    delete this.appSubjects[id];
  }

  getAppSubject(id: string): BehaviorSubject<any> {
    this.addAppSubject(id);
    return this.appSubjects[id];
  }

  postAppInfo(id: any, data: any) {
    this.appSubjects[id].next(data);
  }

  lockApp(id: string, lockStatus: boolean) {
    this.lockSub.next({id, lock: lockStatus});
  }
}
