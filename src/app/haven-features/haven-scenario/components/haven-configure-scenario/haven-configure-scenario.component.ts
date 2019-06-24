import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-haven-configure-scenario',
  templateUrl: './haven-configure-scenario.component.html',
  styleUrls: ['./haven-configure-scenario.component.css']
})
export class HavenConfigureScenarioComponent {

  constructor(
    public dialogRef: MatDialogRef<HavenConfigureScenarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
