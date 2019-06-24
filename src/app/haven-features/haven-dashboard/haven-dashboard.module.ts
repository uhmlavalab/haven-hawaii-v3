import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HavenSharedModule } from '@app/haven-shared';
import { HavenScenarioModule } from '@app/haven-features/haven-scenario';

import { HavenDashboardComponent } from './components/dashboard/haven-dashboard.component';
import { MenuBladeComponent } from './components/menu-blade/menu-blade.component';
import { MenuBladeItemComponent } from './components/menu-blade-item/menu-blade-item.component';
import { YearSelectorComponent } from './components/year-selector/year-selector.component';

@NgModule({
  imports: [
    CommonModule,
    HavenSharedModule,
    HavenScenarioModule
  ],
  declarations: [
    HavenDashboardComponent,
    MenuBladeComponent,
    MenuBladeItemComponent,
    YearSelectorComponent,
  ],
  exports: [
    HavenDashboardComponent,
    YearSelectorComponent
  ],
  entryComponents: [
    HavenDashboardComponent,
  ]
})
export class HavenDashboardModule { }
