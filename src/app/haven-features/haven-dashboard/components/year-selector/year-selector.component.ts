import { Component, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { HavenScenarioService } from '@app/haven-features/haven-scenario';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css'],
  animations: [
    trigger('toggleMenuAnim', [
      state('notactive', style({ bottom: '-175px' })),
      state('active', style({ bottom: '35px' })),
      transition('notactive <=> active', animate('750ms')),
    ])
  ],
})
export class YearSelectorComponent  {

  year = 2030;
  menuState = 'notactive';
  @ViewChild('lineDiv', { static: true }) chartDiv: ElementRef;
  @ViewChild('canvasContainer', { static: true }) canvasContainer: ElementRef;

  ctx: any;
  myChart: any;

  labels = [];
  dataSets = [];

  constructor(private scenarioService: HavenScenarioService) {
    this.scenarioService.renewablePercentSubject.subscribe(value => {
      value.forEach(el => {
        this.labels = this.createYears();
        this.dataSets.push(this.createDataSet(el));
      });
      this.createChart();
    });
  }

  createChart() {
    this.ctx = this.chartDiv.nativeElement.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'line',
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            gridLines: {
              display: false,
              color: 'gray',
            },
            ticks: {
              fontSize: 16,
              fontStyle: 'bold',
              fontColor: 'gray',
            },
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: true,
              color: 'gray',
            },
            ticks: {
              fontSize: 12,
              fontStyle: 'bold',
              fontColor: 'gray',
            }
          }]
        },
        annotation: {
          annotations: [
            {
              drawTime: 'afterDatasetsDraw',
              type: 'line',
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: this.year,
              borderWidth: 4,
              borderColor: '#b95246',
              borderDash: [8, 8],
            }
          ]
        },
      },
      data: {
        labels: this.labels,
        datasets: this.dataSets

      },
    });
  }

  toggleMenu() {
    this.menuState = (this.menuState === 'active' ? 'notactive' : 'active');
  }

  createYears() {
    const data = [];
    for (let i = 2016; i < 2046; i++) {
      data.push(i);
    }
    return data;
  }


  createDataSet(set: any) {
    const data = [];
    set.percents.forEach(el => {
      data.push(el.percent * 100);
    })
    const dataset = {
      label: set.scenarioData.name,
      data,
      backgroundColor: set.scenarioData.color,
      showLine: true,
      fill: false,
      pointRadius: 2,
      borderWidth: 3,
      borderColor: set.scenarioData.color
    };
    return dataset;
  }

  yearChange(event: any) {
    this.year = event.value;
    this.myChart.options.annotation.annotations[0].value = this.year;
    this.myChart.update();
  }

  setValue(labelName: string) {
    const dataSet = this.dataSets.find((el) => el.label === labelName );
    const idx = this.labels.indexOf(this.year);
    const value = dataSet.data[idx];;
    return Math.floor(value);
  }

}
