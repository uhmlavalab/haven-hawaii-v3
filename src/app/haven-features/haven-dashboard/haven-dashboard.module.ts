import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HavenSharedModule } from '@app/haven-shared';

import { HavenDashboardComponent } from './components/dashboard/haven-dashboard.component';
import { MenuBladeComponent } from './components/menu-blade/menu-blade.component';
import { MenuBladeItemComponent } from './components/menu-blade-item/menu-blade-item.component';
import { ScenarioLegendComponent } from './components/scenario-legend/scenario-legend.component';
import { YearSelectorComponent } from './components/year-selector/year-selector.component';

@NgModule({
  imports: [
    CommonModule,
    HavenSharedModule
  ],
  declarations: [
    HavenDashboardComponent,
    MenuBladeComponent,
    MenuBladeItemComponent,
    ScenarioLegendComponent,
    YearSelectorComponent,
  ],
  exports: [
    HavenDashboardComponent,
    ScenarioLegendComponent,
    YearSelectorComponent
  ],
  entryComponents: [
    HavenDashboardComponent,
  ]
})
export class HavenDashboardModule { }
