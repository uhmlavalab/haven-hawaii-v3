export interface Scenario {
  id: string;
  name: string;
  endYear: number;
  startYear: number;
  creationDate: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
  lastUpdate: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
  color: string;
  latitude: number;
  longitude: number;
}
