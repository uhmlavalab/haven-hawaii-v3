import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HavenDatabaseService } from './haven-database.service';
import { NrelDatabaseService } from './nrel-database.service';

import { HavenScenarioModule } from '@app/haven-features/haven-scenario';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HavenScenarioModule,
  ],
  providers: [
    HavenDatabaseService,
    NrelDatabaseService
  ]
})
export class HavenDatabaseModule { }
