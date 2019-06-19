import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css'],
  animations: [
    trigger('toggleMenuAnim', [
      state('notactive', style({ top: '0px' })),
      state('active', style({ top: '-185px' })),
      transition('notactive <=> active', animate('750ms')),
    ])
  ],
})
export class YearSelectorComponent implements OnInit {

  year = 2030;
  menuState = 'notactive';
  @ViewChild('lineDiv', { static: true }) chartDiv: ElementRef;
  ctx: any;
  myChart: any;
  constructor() { }

  ngOnInit() {
    this.ctx = this.chartDiv.nativeElement.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'line',
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              display: false,
              color: '#FFFFFF',
            },
            ticks: {
              fontSize: 16,
              fontStyle: 'bold',
              fontColor: 'white',
            },
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: true,
              color: '#FFFFFF',
            },
            ticks: {
              fontSize: 12,
              fontStyle: 'bold',
              fontColor: 'white',
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
              borderWidth: 3,
              borderColor: 'white',
              borderDash: [5, 5],
            }
          ]
        },
      },
      data: {
        labels: this.createYears(),
        datasets: [
          {
            label: 'E3GenMod',
            data: this.createDataSet(),
            showLine: true,
            fill: false,
            backgroundColor: '#21897E'
          },
          {
            label: 'PostApril',
            data: this.createDataSet(),
            showLine: true,
            fill: false,
            backgroundColor: '#5386E4'
          },
          {
            label: 'E3',
            data: this.createDataSet(),
            showLine: true,
            fill: false,
            backgroundColor: '#88498F'
          },
          {
            label: 'Maui',
            data: this.createDataSet(),
            showLine: true,
            fill: false,
            backgroundColor: '#DD6E42'
          },
          {
            label: 'Big Island',
            data: this.createDataSet(),
            showLine: true,
            fill: false,
            backgroundColor: '#6C698D'
          }
        ]

      },
    });
  }

  toggleMenu() {
    this.menuState = (this.menuState === 'active' ? 'notactive' : 'active');
  }

  createYears() {
    const data = [];
    for (let i = 2016; i < 2045; i++) {
      data.push(i);
    }
    return data;
  }


  createDataSet() {
    const data = [];
    let yVal = 0.0;
    const yValScale = Math.random() * 0.2;
    for (let i = 2016; i < 2045; i++) {
      yVal += Math.random() * yValScale;
      yVal = Math.min(1, yVal);
      data.push(yVal * 100);
    }
    return data;
  }

  yearChange(event: any) {
    this.year = event.value;
    this.myChart.options.annotation.annotations[0].value = this.year;
    this.myChart.update();
  }

}
