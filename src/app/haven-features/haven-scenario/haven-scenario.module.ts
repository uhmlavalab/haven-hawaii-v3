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
import { HavenNewLayerComponent } from './components/haven-new-layer/haven-new-layer.component';

@NgModule({
  declarations: [
    HavenNewScenarioComponent,
    HavenConfigureScenarioComponent,
    HavenScenarioListComponent,
    HavenNewLayerComponent,
  ],
  imports: [
    CommonModule,
    HavenSharedModule
  ],
  exports: [
    HavenNewScenarioComponent,
    HavenConfigureScenarioComponent,
    HavenScenarioListComponent,
    HavenNewLayerComponent
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
    HavenScenarioListComponent,
    HavenNewLayerComponent
  ]
})
export class HavenScenarioModule { }
