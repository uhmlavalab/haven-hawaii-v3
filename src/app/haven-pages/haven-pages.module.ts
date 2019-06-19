import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HavenSharedModule } from '@app/haven-shared';
import { HavenFeaturesModule } from '@app/haven-features';

import { HavenLoginComponent } from './haven-login/haven-login.component';
import { HavenHomeComponent } from './haven-home/haven-home.component';
import { HavenBackgroundDragDirective } from './haven-home/haven-background-drag.directive';

@NgModule({
  imports: [
    CommonModule,
    HavenSharedModule,
    HavenFeaturesModule,
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
