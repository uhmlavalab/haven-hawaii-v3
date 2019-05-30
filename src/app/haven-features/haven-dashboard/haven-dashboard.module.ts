import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HavenSharedModule } from '@app/haven-shared';

import { HavenDashboardComponent } from './components/haven-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    HavenSharedModule
  ],
  declarations: [
    HavenDashboardComponent,
  ],
  exports: [
    HavenDashboardComponent
  ],
  entryComponents: [
    HavenDashboardComponent,
  ]
})
export class HavenDashboardModule { }
