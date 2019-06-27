import { Component, OnInit, OnDestroy } from '@angular/core';
import { HavenScenarioService, Scenario, RenewablePercents } from '@app/haven-features/haven-scenario';
import { HavenAppsService, ChartType } from '../../haven-apps.service';
import { Subscription } from 'rxjs';
import { HavenDatabaseService } from '@app/haven-features/haven-database';

@Component({
  selector: 'app-chart-menu',
  templateUrl: './chart-menu.component.html',
  styleUrls: ['./chart-menu.component.css']
})
export class ChartMenuComponent implements OnInit, OnDestroy {

  id: string;
  query: any;
  scenario: Scenario;

  selectedValue = 'capacity';
  selectedScope = 'yearly';
  selectedChart = 'line';

  valueItems = [
    {
      text: 'Load',
      value: 'load',
    },
    {
      text: 'Generation',
      value: 'generation',
    },
    {
      text: 'Capacity',
      value: 'capacity',
    }
  ];

  scopeItems = [
    {
      text: 'Yearly',
      value: 'yearly',
    },
    {
      text: 'Monthly',
      value: 'monthly',
    },
    {
      text: 'Daily',
      value: 'daily',
    },
    {
      text: 'Hourly',
      value: 'hourly',
    }
  ];

  chartItems = [
    {
      text: 'Line',
      value: 'line',
    },
    {
      text: 'Bar',
      value: 'bar',
    },
    {
      text: 'Heat',
      value: 'heat',
    },
  ];

  reValues: any[];
  yearSub: Subscription;
  selectedYear: number;

  constructor(private scenarioService: HavenScenarioService, private appService: HavenAppsService, private database: HavenDatabaseService) { }

  ngOnInit() {
    this.selectedValue = ChartType[this.query.data.type];
    this.appService.addAppDataSubject(this.id);
    this.reValues = this.scenarioService.getScenarioREValues(this.scenario.id).percents;
    this.postNewAppInfo(this.query.data.year);
    this.yearSub = this.scenarioService.activeYearSubject.subscribe(year => {
      this.selectedYear = year;
      this.postNewAppInfo(year);
      this.getData();
    });
  }

  getData() {
    this.appService.postAppDataInfo(this.id, null);
    if (this.selectedValue === 'capacity') {
      this.database.getCapacity(this.scenario.id).then(capacityData => {
        this.appService.postAppDataInfo(this.id,
          {
            data: capacityData,
            info: { scope: this.selectedScope, value: this.selectedValue, chart: this.selectedChart }
          });
      });
    } else if (this.selectedValue === 'generation') {
      this.database.getGeneration(this.scenario.id, this.selectedYear).then(generationData => {
        this.appService.postAppDataInfo(this.id,
          {
            data: generationData,
            info: { scope: this.selectedScope, value: this.selectedValue, chart: this.selectedChart }
          });
      });
    } else if (this.selectedValue === 'load') {
      this.database.getLoad(this.scenario.id, this.selectedYear).then(loadData => {
        this.appService.postAppDataInfo(this.id,
          {
            data: loadData,
            info: { scope: this.selectedScope, value: this.selectedValue, chart: this.selectedChart }
          });
      });
    }
  }

  postNewAppInfo(year: number) {
    const re = Math.floor(this.reValues.find(el => el.year === year).percent * 100);
    this.appService.postAppInfo(this.id, { year, re });
  }

  ngOnDestroy(): void {
    this.yearSub.unsubscribe();
    this.appService.removeAppSubject(this.id);
    this.appService.removeAppDataSubject(this.id);
  }

  chartChange() {
    this.getData();
  }

  valueChange() {
    this.getData();
  }

}
