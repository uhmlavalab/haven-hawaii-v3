import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HavenSharedModule } from '@app/haven-shared';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { HavenScenarioService } from './services/haven-scenario.service';
import { HavenConfigureScenarioService } from './services/haven-configure-scenario/haven-configure-scenario.service';
import { HavenNewScenarioService } from './services/haven-new-scenario/haven-new-scenario.service';
import { HavenScenarioListService } from './services/haven-scenario-list/haven-scenario-list.service';
import { HavenLayerFillService } from './services/haven-layer-fill/haven-layer-fill.service';

import { HavenNewScenarioComponent } from './components/haven-new-scenario/haven-new-scenario.component';
import { HavenConfigureScenarioComponent } from './components/haven-configure-scenario/haven-configure-scenario.component';
import { HavenScenarioListComponent } from './components/haven-scenario-list/haven-scenario-list.component';
import { HavenNewLayerComponent } from './components/haven-new-layer/haven-new-layer.component';
import { HavenLayerFillComponent } from './components/haven-layer-fill/haven-layer-fill.component';
import { HavenConfigureMapComponent } from './components/haven-configure-map/haven-configure-map.component';
import { HavenConfigureMapService } from './services/haven-configure-map/haven-configure-map.service';

@NgModule({
  declarations: [
    HavenNewScenarioComponent,
    HavenConfigureScenarioComponent,
    HavenScenarioListComponent,
    HavenNewLayerComponent,
    HavenLayerFillComponent,
    HavenConfigureMapComponent,
  ],
  imports: [
    CommonModule,
    HavenSharedModule,
    LeafletModule
  ],
  exports: [
    HavenNewScenarioComponent,
    HavenConfigureScenarioComponent,
    HavenScenarioListComponent,
    HavenNewLayerComponent,
    HavenConfigureMapComponent
  ],
  providers: [
    HavenScenarioService,
    HavenConfigureScenarioService,
    HavenNewScenarioService,
    HavenScenarioListService,
    HavenLayerFillService,
    HavenConfigureMapService
  ],
  entryComponents: [
    HavenConfigureScenarioComponent,
    HavenNewScenarioComponent,
    HavenScenarioListComponent,
    HavenNewLayerComponent,
    HavenLayerFillComponent,
    HavenConfigureMapComponent
  ]
})
export class HavenScenarioModule { }
