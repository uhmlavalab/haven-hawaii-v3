import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFactoryComponent } from './app-factory/app-factory.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { ChartComponent } from './components/chart/chart.component';
import { MapComponent } from './components/map/map.component';
import { HavenAppHostDirective } from './app-factory/app-factory-host.directive';

import { HavenAppsService } from './haven-apps.service';

@NgModule({
  declarations: [
    AppFactoryComponent,
    ChartComponent,
    MapComponent,
    HavenAppHostDirective
  ],
  imports: [
    CommonModule,
    LeafletModule.forRoot()
  ],
  exports : [
    AppFactoryComponent
  ],
  providers: [
    HavenAppsService
  ],
  entryComponents: [
    ChartComponent,
    MapComponent
  ]
})
export class HavenAppsModule { }
