import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from '@app/haven-core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.css']
})
export class LoadingDialogComponent implements OnInit {

  progress = -1;
  name = '';

  constructor(
    public dialogRef: MatDialogRef<LoadingDialogComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    firebase.firestore().doc(`users/${this.authService.getUserId()}/scenarios/${this.data.scenarioId}`).onSnapshot(snapshot => {
      if (snapshot.data().progress) {
        this.progress = snapshot.data().progress;
      }
      this.name = snapshot.data().name;
    });
  }

  ngOnDestroy() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
