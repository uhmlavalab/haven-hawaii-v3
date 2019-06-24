import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HavenSharedModule } from '@app/haven-shared';
import { HavenDashboardModule } from '@app/haven-features/haven-dashboard';
import { HavenScenarioModule } from '@app/haven-features/haven-scenario';
import { HavenWindowModule } from '@app/haven-features/haven-window';
import { HavenSessionModule } from '@app/haven-features/haven-session';

import { HavenLoginComponent } from './haven-login/haven-login.component';
import { HavenHomeComponent } from './haven-home/haven-home.component';
import { HavenBackgroundDragDirective } from './haven-home/haven-background-drag.directive';

@NgModule({
  imports: [
    CommonModule,
    HavenSharedModule,
    HavenDashboardModule,
    HavenScenarioModule,
    HavenWindowModule,
    HavenSessionModule
  ],
  declarations: [
    HavenLoginComponent,
    HavenHomeComponent,
    HavenBackgroundDragDirective,
  ],
  exports: [
    HavenLoginComponent,
    HavenHomeComponent,
  ],
})
export class HavenPagesModule { }
