import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NrelDatabaseService {

  private url = '/api/haven/';
  constructor(private http: HttpClient) { }

  getModels(): Promise<any> {
    return new Promise(resolve => {
      const httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Cache-Control', 'no-cache')
        .set('Access-Control-Allow-Origin', '*');

      const options = {
        headers: httpHeaders
      };

      return this.http.post(
        this.url,
        {
          email: 'rtheriot@hawaii.edu',
          password: '7x8gTFcX',
        },
        options
      ).subscribe((data) => {
        return resolve(data['models']);
      });
    });

  }

  getScenario(modelId: string): Promise<any> {
    return new Promise(resolve => {
      const httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Cache-Control', 'no-cache')
        .set('Access-Control-Allow-Origin', '*');

      const options = {
        headers: httpHeaders
      };

      return this.http.post(
        this.url,
        {
          email: 'rtheriot@hawaii.edu',
          password: '7x8gTFcX',
          model_uuid: modelId
        },
        options
      ).subscribe((data) => {
        return resolve(data['scenarios']);
      });
    });

  }

  getData(modelId: string, scenarioId: string) {
    return new Promise(resolve => {
      const httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Cache-Control', 'no-cache')
        .set('Access-Control-Allow-Origin', '*');

      const options = {
        headers: httpHeaders
      };

      return this.http.post(
        this.url,
        {
          email: 'rtheriot@hawaii.edu',
          password: '7x8gTFcX',
          model_uuid: modelId,
          scenario_id: scenarioId
        },
        options
      ).subscribe((data) => {
        console.log(JSON.stringify(data));
        return resolve(data);
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
