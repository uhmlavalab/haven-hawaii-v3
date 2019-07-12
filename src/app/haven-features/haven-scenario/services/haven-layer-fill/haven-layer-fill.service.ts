import { Injectable } from '@angular/core';
import { HavenLayerFillComponent } from '../../components/haven-layer-fill/haven-layer-fill.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MapLayer, HavenNewLayerComponent } from '../../components/haven-new-layer/haven-new-layer.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '@app/haven-core';
import { MatDialog } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class HavenLayerFillService {

  constructor(private authService: AuthService, private dialog: MatDialog, private storage: AngularFireStorage, private snackBar: MatSnackBar) { }

  openDialog(mapLayer: MapLayer): Promise<any> {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(HavenLayerFillComponent, {
        width: '600px',
        data: mapLayer
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result);
        }
        return resolve(result);
      });
    })

  }
}
