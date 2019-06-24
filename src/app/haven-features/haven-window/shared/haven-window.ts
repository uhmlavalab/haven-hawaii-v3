export enum AppType {
  plotly = 'plotly',
  map = 'leaflet'
}

export class HavenWindow {

  id: string;
  title: string;
  color: string;

  width: number;
  height: number;
  left: number;
  top: number;
  zindex: number;

  appType: AppType;

}


