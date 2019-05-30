import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HavenWindowModule } from './haven-window/haven-window.module';
import { HavenDashboardModule } from './haven-dashboard/haven-dashboard.module';

@NgModule({

  imports: [
    CommonModule,
    HavenWindowModule,
    HavenDashboardModule
  ],
  exports: [
    HavenWindowModule,
    HavenDashboardModule
  ]
})
export class HavenFeaturesModule { }
