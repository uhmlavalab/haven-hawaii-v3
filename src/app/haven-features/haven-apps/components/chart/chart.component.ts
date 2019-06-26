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

  }

  ngOnDestroy() {
    this.appDataSub.unsubscribe();
  }

  createChart(data: any[], info: any) {

    data.forEach(el => {
      if (info.chart === 'line') {
        el.mode = 'lines+markers';
        el.marker = {
          size: 5
        };
        el.line = {
          width: 3
        };
      } else if (info.chart === 'bar') {
        el.type = 'bar';
      } else {
        el.mode = 'lines+markers';
        el.marker = {
          size: 5
        };
        el.line = {
          width: 3
        };
      }
    });

    this.loaded = true;
    this.changeDetector.detectChanges();
    const layout = {
      height: this.chartDiv.nativeElement.getBoundingClientRect().height,
      width: this.chartDiv.nativeElement.getBoundingClientRect().width,
      margin: {
        t: 35,
        l: 55,
        r: 20,
        b: 50,
      },
      font: {
        family: 'Roboto, sans-serif',
      },
      hovermode: 'closest',
      barmode: 'stack'
    };

    Plotly.newPlot(this.chartDiv.nativeElement, data, layout);
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
