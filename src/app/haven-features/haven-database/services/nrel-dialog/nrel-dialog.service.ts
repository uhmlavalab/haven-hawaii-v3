import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NrelDataDialogComponent } from '../../components/nrel-data-dialog/nrel-data-dialog.component';
import { NrelDataViewerComponent } from '../../components/nrel-data-viewer/nrel-data-viewer.component';

@Injectable({
  providedIn: 'root'
})
export class NrelDialogService {

  constructor(private dialog: MatDialog) { }

  openNrelDataDialog() {
    const dialogRef = this.dialog.open(NrelDataDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openNrelDataViwerDialog(result);
      }
    });
  }

  openNrelDataViwerDialog(data: any) {
    const dialogRef = this.dialog.open(NrelDataViewerComponent, {
      width: '80vw',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('ScenarioList Closed');
      }
    });
  }
  
}
