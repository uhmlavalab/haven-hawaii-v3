import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LoadingDialogComponent
  ],
  declarations: [LoadingDialogComponent],
  entryComponents: [
    LoadingDialogComponent
  ]
})
export class HavenSharedModule { }
