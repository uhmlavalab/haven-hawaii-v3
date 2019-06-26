import { Injectable } from '@angular/core';
import { HavenWindow } from '../shared/haven-window';

import { AppType } from '@app/haven-features/haven-apps';
import { AuthService } from '@app/haven-core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Subject } from 'rxjs';
import { Scenario, HavenScenarioService } from '@app/haven-features/haven-scenario';
import { ChartType, MapType} from '@app/haven-features/haven-apps/haven-apps.service';


@Injectable()
export class HavenWindowService {

  private windows: HavenWindow[] = [];
  private windowsZIndex = {};

  WindowZUpdate = new Subject<object>();
  HavenWindowAdd = new Subject<HavenWindow>();
  HavenWindowRemove = new Subject<HavenWindow>();

  currentZoom = 0;

  constructor(private scenarioService: HavenScenarioService, private afStore: AngularFirestore) {

  }


  getWindows(): Promise<HavenWindow[]> {
    return Promise.resolve(this.windows);
  }

  removeWindow(wId: string) {
    for (let i = this.windows.length - 1; i >= 0; i--) {
      if (this.windows[i].id === wId) {
        this.HavenWindowRemove.next(this.windows[i]);
        this.windows.splice(i, 1);
        this.removeZWindow(wId);
      }
    }
  }

  addWindow(win: HavenWindow) {
    this.windows.push(win);
    this.HavenWindowAdd.next(win);
    this.addZWindow(win.id);
    return win.id;
  }

  setWindows(Windows: any[]) {
    this.clearWindows();
    Windows.forEach(el => {
      this.addWindow(el);
      el.app.appInfo.winId = el.id;
    });
  }

  getWindow(wId: string): Promise<HavenWindow> {
    for (let i = this.windows.length - 1; i >= 0; i--) {
      if (this.windows[i].id === wId) { return Promise.resolve(this.windows[i]); }
    }
  }

  clearWindows() {
    for (let i = 0; i < this.windows.length; i++) {
      this.HavenWindowRemove.next(this.windows[i]);
      this.removeZWindow(this.windows[i].id);
    }
    this.windows.length = 0;
  }

  bringWindowForward(windowId: string) {
    const winZ = this.windowsZIndex[windowId];
    for (const winId in this.windowsZIndex) {
      if (this.windowsZIndex[winId] > winZ) {
        this.windowsZIndex[winId]--;
      }
    }
    this.windowsZIndex[windowId] = this.windows.length;
    this.WindowZUpdate.next(this.windowsZIndex);
  }

  addZWindow(windowId: string) {
    this.windowsZIndex[windowId] = this.windows.length;
    this.WindowZUpdate.next(this.windowsZIndex);
  }

  removeZWindow(windowId: string) {
    const winZ = this.windowsZIndex[windowId];
    delete this.windowsZIndex[windowId];
    for (const winId in this.windowsZIndex) {
      if (this.windowsZIndex[winId] > winZ) {
        this.windowsZIndex[winId]--;
      }
    }
    this.WindowZUpdate.next(this.windowsZIndex);
  }

  createChart(type: ChartType, scenario: Scenario) {
    const window = new HavenWindow();
    window.height = 400;
    window.width = 400;
    window.left = 200;
    window.top = 200;
    window.color = scenario.color,
      window.name = scenario.name,
      window.id = this.afStore.createId();
    window.appType = AppType.plotly;
    window.scenario = scenario;
    window.query = { data: { year: this.scenarioService.getActiveYear(), type }};
    this.addWindow(window);
  }

  createMap(type: MapType, scenario: Scenario) {
    const window = new HavenWindow();
    window.height = 400;
    window.width = 400;
    window.left = 200;
    window.top = 200;
    window.color = scenario.color,
      window.name = scenario.name,
      window.id = this.afStore.createId();
    window.appType = AppType.leaflet;
    window.scenario = scenario;
    window.query = { data: { year: this.scenarioService.getActiveYear(), type}};
    this.addWindow(window);
  }

}
