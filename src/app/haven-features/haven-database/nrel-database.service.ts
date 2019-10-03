import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NrelDatabaseService {

  private url = '/api/haven/';
  constructor(private http: HttpClient) {

  }

  callNREL(dataType: string): Promise<any> {
    return new Promise(resolve => {
      let httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Cache-Control', 'no-cache')
        .set('Access-Control-Allow-Origin', '*');

      let options = {
        headers: httpHeaders
      };

      return this.http.post(
        this.url,
        {
          email: 'rtheriot@hawaii.edu',
          password: '7x8gTFcX',
          model_uuid: '9c9518a4-c265-4a8d-870b-8181f9abfce2',
          scenario_id: '47'
        },
        options
      ).subscribe((data) => {
        const processedData = {};
        console.log(data);
        Object.keys(data['scenario_data'][dataType]).forEach(key => {
          const year = key;
          data['scenario_data'][dataType][year].forEach(element => {
            if (element.technology.split('_')[0] !== 'free') {
              if (!processedData.hasOwnProperty(element.technology)) {
                processedData[element.technology] = {};
              }
              if (!processedData[element.technology].hasOwnProperty(year)) {
                processedData[element.technology][year] = 0;
              }
              processedData[element.technology][year] += Number(element[dataType]);
            }
          });
        });
        const finalData = [];
        Object.keys(processedData).forEach(tech => {
          const trace = {
            mode: "lines+markers",
            name: tech,
            x: [],
            y: []
          };
          Object.keys(processedData[tech]).forEach(year => {
            const value = processedData[tech][year];
            trace.y.push(value);
            trace.x.push(year);
          });
          finalData.push(trace);
        });
        return resolve(finalData);
      });
    });

  }
}

// color: "#5F4690"
// line: {color: "#5F4690", width: 3}
// marker: {color: "#5F4690", size: 5}
// mode: "lines+markers"
// name: "Hydro"
// order: 7
// stackgroup: null
// x: (30) [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045]
// y: (30) [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
