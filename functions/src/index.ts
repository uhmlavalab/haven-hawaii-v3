

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const csv = require('csv-parser');
const path = require('path');
const os = require('os');
const fs = require('fs');

const storageBucket = 'gs://haven-hawaii-v3.appspot.com';

function parseNewScenario(data: any, context: functions.https.CallableContext) {
  const uid = context.auth!.uid;
  const scenarioId = data.scenarioId;
  return updateProgress(0, uid, scenarioId).then(() => {
    const capTask = downloadFileFromBucket(storageBucket, 'rawcapacity.csv', `users/${uid}/scenarios/${scenarioId}/rawcapacity.csv`);
    const genTask = downloadFileFromBucket(storageBucket, 'rawgeneration.csv', `users/${uid}/scenarios/${scenarioId}/rawgeneration.csv`);
    const stationTask = downloadFileFromBucket(storageBucket, 'rawstation.csv', `users/${uid}/scenarios/${scenarioId}/rawstation.csv`);
    return Promise.all([capTask, genTask, stationTask]).then((parsedData) => {
      return updateProgress(20, uid, scenarioId).then(() => {
        const capData = parsedData[0];
        const genData = parsedData[1];
        const stationData = parsedData[2];
        const csvData = { capData, genData, stationData };
        return parseScenarioData(csvData, uid, scenarioId).then(finalData => {
          const genTasks = [] as any[];
          const years = [] as number[];
          Object.keys(finalData.generation).forEach(year => {
            years.push(Number(year));
            const task = admin.database().ref(`users/${uid}/scenarios/${scenarioId}/generation/${year}`).set(finalData.generation[year]);
            genTasks.push(task);
          });
          const task1 = admin.database().ref(`users/${uid}/scenarios/${scenarioId}/stations`).set(finalData.stations);
          const task2 = admin.database().ref(`users/${uid}/scenarios/${scenarioId}/capacity`).set(finalData.capacity);
          const task3 = admin.database().ref(`users/${uid}/scenarios/${scenarioId}/renewablepercent`).set(finalData.renewablepercent);
          const task4 = admin.firestore().collection(`users/${uid}/scenarios/`).doc(scenarioId).update({ endYear: Math.max(...years), startYear: Math.min(...years) });
          return Promise.all([task1, task2, task3, task4, ...genTasks]).then(() => {
            return updateProgress(100, uid, scenarioId).then(() => {
              return true;
            })
          })
        })
      });
    });
  });
};


function downloadFileFromBucket(bucketName: string, fileName: string, filePath: string): Promise<any[]> {
  // Download file from bucket.
  const bucket = admin.storage().bucket(bucketName);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  return bucket.file(filePath).download({ destination: tempFilePath }).then(() => {
    return new Promise((resolve, reject) => {
      const data = [] as any[];
      fs.createReadStream(tempFilePath).pipe(csv())
        .on('data', (row: any) => {
          data.push(row);
        })
        .on('end', () => {
          fs.unlinkSync(tempFilePath);
          resolve(data);
        })
        .on('error', (error: any) => reject(error));;
    });
  });

}

// key - id, location, technology, name
// generation - year, hour, ....names
// capacity - technology, year, scenario, value
function parseScenarioData(scenarioData: any, uid: string, scenarioId: string): Promise<any> {
  const stations = {} as any;
  const generation = {} as any;
  const capacity = {} as any;
  const renewablepercent = {} as any;
  return new Promise((resolve, error) => {
    scenarioData.stationData.forEach((stationEl: any) => {
      const renewable = (stationEl.technology === 'fossil' || stationEl.technology === 'demand') ? false : true;
      stations[stationEl.name] = { 'name': stationEl.name, 'technology': stationEl.technology, 'renewable': renewable };
    });
    return updateProgress(40, uid, scenarioId).then(() => {
      scenarioData.genData.forEach((genEl: any) => {
        const date = new Date(genEl.hour);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        Object.keys(genEl).forEach(el => {
          if (el === 'year' || el === 'hour') return;
          if (!stations.hasOwnProperty(el)) return;
          const technology = stations[el].technology;
          if (!generation.hasOwnProperty(year)) generation[year] = {};
          if (!generation[year].hasOwnProperty(month)) generation[year][month] = {};
          if (!generation[year][month].hasOwnProperty(day)) generation[year][month][day] = {};
          if (!generation[year][month][day].hasOwnProperty(hour)) generation[year][month][day][hour] = {};
          if (!generation[year][month][day][hour].hasOwnProperty(technology)) generation[year][month][day][hour][technology] = 0;
          generation[year][month][day][hour][technology] += Number(genEl[el]);

          if (technology === 'demand') return;
          if (!renewablepercent.hasOwnProperty(year)) renewablepercent[year] = { renewableEnergy: 0, nonRenewableEnergy: 0 };
          (stations[el].renewable) ? renewablepercent[year].renewableEnergy += Number(genEl[el]) : renewablepercent[year].nonRenewableEnergy += Number(genEl[el])
        })
      });
      Object.keys(renewablepercent).forEach(year => {
        const re = renewablepercent[year].renewableEnergy / (renewablepercent[year].renewableEnergy + renewablepercent[year].nonRenewableEnergy);
        renewablepercent[year]['percent'] = re;
      })
      return updateProgress(60, uid, scenarioId).then(() => {
        scenarioData.capData.forEach((capEl: any) => {
          const technology = capEl.technology;
          const year = capEl.year;
          const capValue = Number(capEl.value);
          if (!capacity.hasOwnProperty(year)) capacity[year] = {};
          if (!capacity[year].hasOwnProperty(technology)) capacity[year][technology] = 0;
          capacity[year][technology] += capValue;
        });
        return updateProgress(80, uid, scenarioId).then(() => {
          resolve({ stations, generation, capacity, renewablepercent });
        });
      });
    });
  });
}

async function updateProgress(percent: number, uid: string, scenarioId: string) {
  await admin.firestore().collection(`users/${uid}/scenarios/`).doc(scenarioId).update({ progress: percent });
}


exports.parseNewScenario = functions.https.onCall(parseNewScenario);

