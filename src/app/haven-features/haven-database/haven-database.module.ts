import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HavenDatabaseService } from './haven-database.service';

import { HavenScenarioModule } from '@app/haven-features/haven-scenario';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HavenScenarioModule
  ],
  providers: [
    HavenDatabaseService
  ]
})
export class HavenDatabaseModule { }
