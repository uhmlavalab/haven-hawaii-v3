import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { HavenScenarioService, RenewablePercents, Scenario } from '@app/haven-features/haven-scenario';

import { HavenConfigureScenarioService } from '@app/haven-features/haven-scenario';

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
export class YearSelectorComponent implements OnInit {

  year: number;
  menuState = 'notactive';
  @ViewChild('lineDiv', { static: true }) chartDiv: ElementRef;
  @ViewChild('canvasContainer', { static: true }) canvasContainer: ElementRef;

  ctx: any;
  myChart: any;

  labels = [];
  dataSets = [];
  scenarios: Scenario[] = [];
  selectedScenario: string = '';

  constructor(private scenarioService: HavenScenarioService, private configureScenarioService: HavenConfigureScenarioService) {

  }

  ngOnInit(): void {
    this.scenarioService.renewablePercentSubject.subscribe(value => {
      this.labels = [];
      this.dataSets = [];
      this.scenarios = [];
      value.forEach(el => {
        this.scenarios.push(el.scenarioInfo);
        this.labels = this.createYears();
        this.dataSets.push(this.createDataSet(el));
      });
      this.year = this.labels[0];
      if (this.scenarios.length > 0) { this.selectScenario(this.scenarios[0].id); }
      this.scenarioService.setActiveYear(this.year);
      this.createChart();
    });


  }

  createChart() {
    this.ctx = this.chartDiv.nativeElement.getContext('2d');
    if (this.myChart) this.myChart.destroy();
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


  createDataSet(set: RenewablePercents) {
    const data = [];
    set.percents.forEach(el => {
      data.push(el.percent * 100);
    })
    const dataset = {
      label: set.scenarioInfo.name,
      data,
      backgroundColor: set.scenarioInfo.color,
      showLine: true,
      fill: false,
      pointRadius: 2,
      borderWidth: 3,
      borderColor: set.scenarioInfo.color,
      id: set.scenarioInfo.id
    };
    return dataset;
  }

  yearChange(event: any) {
    this.year = event.value;
    this.myChart.options.annotation.annotations[0].value = this.year;
    this.myChart.update();
  }

  yearUpdate() {
    this.scenarioService.setActiveYear(this.year);
  }

  setValue(labelName: string) {
    const dataSet = this.dataSets.find((el) => el.label === labelName);
    const idx = this.labels.indexOf(this.year);
    const value = dataSet.data[idx];
    return Math.floor(value);
  }

  configureScenario(scenarioId: string) {
    this.configureScenarioService.openDialog(this.scenarios.find(el => el.id === scenarioId) as Scenario);
  }

  selectScenario(scenarioId: string) {
    this.selectedScenario = scenarioId;
    this.scenarioService.setSelectedScenario(scenarioId);
  }

}
