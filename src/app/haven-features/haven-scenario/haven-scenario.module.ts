import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HavenSharedModule } from '@app/haven-shared';


import { HavenConfigureScenarioService } from './services/haven-configure-scenario/haven-configure-scenario.service';
import { HavenNewScenarioService } from './services/haven-new-scenario/haven-new-scenario.service';
import { HavenNewScenarioComponent } from './components/haven-new-scenario/haven-new-scenario.component';
import { HavenConfigureScenarioComponent } from './components/haven-configure-scenario/haven-configure-scenario.component';

@NgModule({
  declarations: [
    HavenNewScenarioComponent,
    HavenConfigureScenarioComponent,
  ],
  imports: [
    CommonModule,
    HavenSharedModule
  ],
  exports: [
    HavenNewScenarioComponent,
    HavenConfigureScenarioComponent
  ],
  providers: [
    HavenConfigureScenarioService,
    HavenNewScenarioService
  ],
  entryComponents: [
    HavenConfigureScenarioComponent,
    HavenNewScenarioComponent
  ]
})
export class HavenScenarioModule { }
