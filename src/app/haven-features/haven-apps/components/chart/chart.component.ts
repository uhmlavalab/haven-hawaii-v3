import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';

import { Scenario } from '@app/haven-features/haven-scenario';
import { HavenAppsService } from '../../haven-apps.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit, OnDestroy {

  id: string;
  query: any;
  scenario: Scenario;
  lock: boolean;
  lockSub: Subscription;

  loaded = false;

  appDataSub: Subscription;

  @ViewChild('chart', { static: true }) chartDiv: ElementRef;
  constructor(private appService: HavenAppsService, private changeDetector: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {

    this.appDataSub = this.appService.getAppDataSubject(this.id).subscribe(value => {
      this.loaded = false;
      if (value && Array.isArray(value.data) ) {
        this.createChart(value.data, value.info);
      }
    });

    this.lockSub = this.appService.lockSub.subscribe(value => { if (value.id === this.id) { this.lock = value.lock; } });

  }

  ngOnDestroy() {
    this.appDataSub.unsubscribe();
    this.lockSub.unsubscribe();

  }

  createChart(data: any[], info: any) {

    const dataSorted = [];

    const heatData = [{
      type: 'heatmap',
      colorscale: 'Portland',
      z: [],
      y: [],
      x: data[0].x
    }];

    data.forEach(el => {
      if (info.chart === 'line') {
        el.mode = 'lines+markers';
        el.stackgroup = (el.name === 'Demand' || info.value === 'capacity') ? null : 'one';
        el.marker = {
          color: el.color,
          size: 5
        };
        el.line = {
          color: el.color,
          width: 3
        };
      } else if (info.chart === 'bar') {
        el.type = 'bar';
        el.marker = {
          color: el.color
        };
      } else if (info.chart === 'heat') {
        heatData[0].z.push(el.y);
        heatData[0].y.push(el.name);
      }
    });

    this.loaded = true;
    this.changeDetector.detectChanges();
    const layout = {
      height: this.chartDiv.nativeElement.getBoundingClientRect().height,
      width: this.chartDiv.nativeElement.getBoundingClientRect().width,
      margin: {
        t: 65,
        l: 55,
        r: 20,
        b: 50,
      },
      title: info.value.charAt(0).toUpperCase() + info.value.slice(1),
      font: {
        family: 'Roboto, sans-serif',
      },
      hovermode: 'closest',
      barmode: 'stack'
    };
    if (info.chart === 'heat') {
      Plotly.newPlot(this.chartDiv.nativeElement, heatData, layout);
    } else {
      Plotly.newPlot(this.chartDiv.nativeElement, data, layout);
    }
  }

  public resize() {
    if (this.loaded) {
      const update = {
        height: this.chartDiv.nativeElement.getBoundingClientRect().height,
        width: this.chartDiv.nativeElement.getBoundingClientRect().width
      };
      Plotly.relayout(this.chartDiv.nativeElement, update);
    }
  }

}
