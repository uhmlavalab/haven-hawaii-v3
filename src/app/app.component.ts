import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';


// import * as Plotly from 'plotly.js';

// import { AngularFirestore } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  // title = 'haven-hawaii-v3';

  // items: Observable<any[]>;
  // constructor(db: AngularFirestore) {
  //   this.items = db.collection('items').valueChanges();
  // }

  // ngOnInit(): void {
  //   // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   // Add 'implements OnInit' to the class.
  //   const trace1 = {
  //     x: [1, 2, 3, 4],
  //     y: [10, 15, 13, 17],
  //     mode: 'markers',
  //     type: 'scatter'
  //   } as Plotly.PlotData;

  //   const trace2 = {
  //     x: [2, 3, 4, 5],
  //     y: [16, 5, 11, 9],
  //     mode: 'lines',
  //     type: 'scatter'
  //   } as Plotly.PlotData;

  //   const trace3 = {
  //     x: [1, 2, 3, 4],
  //     y: [12, 9, 15, 12],
  //     mode: 'lines+markers',
  //     type: 'scatter'
  //   } as Plotly.PlotData;

  //   const data = [trace1, trace2, trace3];
  //   Plotly.newPlot(this.chartDiv.nativeElement, data);
  // }

}
