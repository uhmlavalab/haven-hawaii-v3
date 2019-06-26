import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HavenSharedModule } from '@app/haven-shared';
import { HavenAppsModule } from '@app/haven-features/haven-apps';

import { HavenWindowComponent } from './component/haven-window.component';
import { HavenWindowFactoryComponent } from './factory/haven-window-factory.component';
import { HavenWindowBringforwardDirective } from './directives/haven-window-bringforward.directive';
import { HavenWindowDragDirective } from './directives/haven-window-drag.directive';
import { HavenWindowHostDirective } from './directives/haven-window-host.directive';
import { HavenWindowMaximizeDirective } from './directives/haven-window-maximize.directive';
import { HavenWindowResizeDirective } from './directives/haven-window-resize.directive';
import { HavenWindowService } from './services/haven-window.service';


@NgModule({
  imports: [
    CommonModule,
    HavenSharedModule,
    HavenAppsModule,
  ],
  declarations: [
    HavenWindowComponent,
    HavenWindowFactoryComponent,
    HavenWindowBringforwardDirective,
    HavenWindowDragDirective,
    HavenWindowHostDirective,
    HavenWindowMaximizeDirective,
    HavenWindowResizeDirective,
  ],
  exports: [
    HavenWindowFactoryComponent,
    HavenWindowComponent
  ],
  entryComponents: [
    HavenWindowComponent,
  ],
  providers: [
    HavenWindowService
  ]
})
export class HavenWindowModule { }
