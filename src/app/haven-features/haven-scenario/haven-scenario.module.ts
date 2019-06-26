import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HavenSharedModule } from '@app/haven-shared';

import { HavenScenarioService } from './services/haven-scenario.service';
import { HavenConfigureScenarioService } from './services/haven-configure-scenario/haven-configure-scenario.service';
import { HavenNewScenarioService } from './services/haven-new-scenario/haven-new-scenario.service';
import { HavenScenarioListService } from './services/haven-scenario-list/haven-scenario-list.service';

import { HavenNewScenarioComponent } from './components/haven-new-scenario/haven-new-scenario.component';
import { HavenConfigureScenarioComponent } from './components/haven-configure-scenario/haven-configure-scenario.component';
import { HavenScenarioListComponent } from './components/haven-scenario-list/haven-scenario-list.component';

@NgModule({
  declarations: [
    HavenNewScenarioComponent,
    HavenConfigureScenarioComponent,
    HavenScenarioListComponent,
  ],
  imports: [
    CommonModule,
    HavenSharedModule
  ],
  exports: [
    HavenNewScenarioComponent,
    HavenConfigureScenarioComponent,
    HavenScenarioListComponent
  ],
  providers: [
    HavenScenarioService,
    HavenConfigureScenarioService,
    HavenNewScenarioService,
    HavenScenarioListService
  ],
  entryComponents: [
    HavenConfigureScenarioComponent,
    HavenNewScenarioComponent,
    HavenScenarioListComponent
  ]
})
export class HavenScenarioModule { }
