import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { routes } from './app.routes';


import { AppComponent } from './app.component';



import { HavenCoreModule } from '@app/haven-core';
import { HavenSharedModule } from '@app/haven-shared';
import { HavenPagesModule } from '@app/haven-pages';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routes,

    HavenCoreModule,
    HavenSharedModule,
    HavenPagesModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
