
import { AppType } from '@app/haven-features/haven-apps';
import { Scenario } from '@app/haven-features/haven-scenario';

export class HavenWindow {

  id: string;
  name: string;
  color: string;

  width: number;
  height: number;
  left: number;
  top: number;
  zindex: number;

  appType: AppType;
  query: {scenario: Scenario, data: any}

}


