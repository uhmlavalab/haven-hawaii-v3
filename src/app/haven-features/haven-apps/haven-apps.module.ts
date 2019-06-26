import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFactoryComponent } from './app-factory/app-factory.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HavenSharedModule } from '@app/haven-shared';

import { ChartComponent } from './components/chart/chart.component';
import { MapComponent } from './components/map/map.component';
import { HavenAppHostDirective } from './app-factory/app-factory-host.directive';

import { HavenAppsService } from './haven-apps.service';
import { HavenAppMenuHostDirective } from './app-menu-factory/app-menu-factory-host.directive';
import { AppMenuFactoryComponent } from './app-menu-factory/app-menu-factory.component';
import { ChartMenuComponent } from './components/chart-menu/chart-menu.component';
import { MapMenuComponent } from './components/map-menu/map-menu.component';

@NgModule({
  declarations: [
    AppFactoryComponent,
    AppMenuFactoryComponent,
    ChartComponent,
    MapComponent,
    HavenAppHostDirective,
    HavenAppMenuHostDirective,
    ChartMenuComponent,
    MapMenuComponent
  ],
  imports: [
    CommonModule,
    HavenSharedModule,
    LeafletModule.forRoot()
  ],
  exports : [
    AppFactoryComponent,
    AppMenuFactoryComponent
  ],
  providers: [
    HavenAppsService
  ],
  entryComponents: [
    ChartComponent,
    MapComponent,
    ChartMenuComponent,
    MapMenuComponent
  ]
})
export class HavenAppsModule { }
