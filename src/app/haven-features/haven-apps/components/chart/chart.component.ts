import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';

import { HavenDatabaseService } from '@app/haven-features/haven-database';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  loaded = false;
  id: string;
  query: any;
  @ViewChild('chart', { static: true }) chartDiv: ElementRef;
  constructor(private database: HavenDatabaseService, private changeDetector: ChangeDetectorRef) {

  }

  ngOnInit() {

    this.database.getGenerationData(this.query.scenario.id).then(value => {
      this.createChart();
    });
  }

  createChart() {

    const trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers',
      type: 'scatter'
    };

    const trace2 = {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: 'lines',
      type: 'scatter'
    };

    const trace3 = {
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers',
      type: 'scatter'
    };
    this.loaded = true;
    this.changeDetector.detectChanges();
    const layout = {
      height: this.chartDiv.nativeElement.getBoundingClientRect().width,
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
    };
    const data = [trace1, trace2, trace3];

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
