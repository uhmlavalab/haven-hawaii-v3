import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HavenSharedModule } from '@app/haven-shared';

import { HavenDatabaseService } from './services/haven-database/haven-database.service';
import { NrelDatabaseService } from './services/nrel-database/nrel-database.service';

import { HavenScenarioModule } from '@app/haven-features/haven-scenario';
import { NrelDataDialogComponent } from './components/nrel-data-dialog/nrel-data-dialog.component';
import { NrelDialogService } from './services/nrel-dialog/nrel-dialog.service';
import { NrelDataViewerComponent } from './components/nrel-data-viewer/nrel-data-viewer.component';

@NgModule({
  declarations: [
    NrelDataDialogComponent,
    NrelDataViewerComponent
  ],
  imports: [
    CommonModule,
    HavenScenarioModule,
    HavenSharedModule
  ],
  providers: [
    HavenDatabaseService,
    NrelDatabaseService,
    NrelDialogService
  ],
  exports: [
    NrelDataDialogComponent,
    NrelDataViewerComponent
  ],
  entryComponents: [
    NrelDataDialogComponent,
    NrelDataViewerComponent
  ]
})
export class HavenDatabaseModule { }
