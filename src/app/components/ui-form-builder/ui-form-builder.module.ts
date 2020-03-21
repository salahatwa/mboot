import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestFormComponent } from './best-form.component';
import { DndModule } from 'ngx-drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SlidePanelComponent } from './slide-panel/slide-panel.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { EnumKeysPipe } from './enum_pipe';
import { MaterialModule } from '../../shared/shared-module/material.module';
import { ViewFormModule } from './view-form/view-form.module';


@NgModule({
  declarations: [EnumKeysPipe,SlidePanelComponent,BestFormComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DndModule,
    ScrollDispatchModule,
    ViewFormModule
  ],
  exports:[
    BestFormComponent,
    ViewFormModule,
    EnumKeysPipe
  ],
  entryComponents:[
    ConfirmDialogComponent
  ]
})
export class UiFormBuilderModule { }
