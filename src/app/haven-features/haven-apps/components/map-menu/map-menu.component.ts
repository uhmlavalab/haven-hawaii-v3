import { Component, OnInit, OnDestroy } from '@angular/core';
import { Scenario, HavenScenarioService } from '@app/haven-features/haven-scenario';
import { Subscription } from 'rxjs';
import { HavenAppsService } from '../../haven-apps.service';

@Component({
  selector: 'app-map-menu',
  templateUrl: './map-menu.component.html',
  styleUrls: ['./map-menu.component.css']
})
export class MapMenuComponent implements OnInit, OnDestroy {

  id: string;
  scenario: Scenario;
  query: any;
  lock: boolean;
  lockSub: Subscription

  selectedYear: number;
  yearSub: Subscription;

  loaded = false;
  reValues: any[];

  constructor(private appService: HavenAppsService, private scenarioService: HavenScenarioService) { }

  ngOnInit() {
    this.appService.addAppDataSubject(this.id);
    this.reValues = this.scenarioService.getScenarioREValues(this.scenario.id).percents;
    this.postNewAppInfo(this.query.data.year);
    this.lockSub = this.appService.lockSub.subscribe(value => { if (value.id === this.id) { this.lock = value.lock; } });

    this.yearSub = this.scenarioService.activeYearSubject.subscribe(year => {
      this.selectedYear = year;
      this.postNewAppInfo(year);
      if (!this.lock) {

      }

    });

  }

  postNewAppInfo(year: number) {
    const re = Math.floor(this.reValues.find(el => el.year === year).percent * 100);
    this.appService.postAppInfo(this.id, { year, re });
  }
  ngOnDestroy() {
    this.yearSub.unsubscribe();
    this.lockSub.unsubscribe();
  }
}
