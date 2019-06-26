import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { HavenScenarioListComponent } from '../../components/haven-scenario-list/haven-scenario-list.component';

@Injectable({
  providedIn: 'root'
})
export class HavenScenarioListService {

  constructor(private dialog: MatDialog) { }

  openScenarioListDialog(): void {
    const dialogRef = this.dialog.open(HavenScenarioListComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('ScenarioList Closed');
      }
    });
  }
}
