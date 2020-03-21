import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFormComponent } from './view-form.component';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material';

@NgModule({
  declarations: [ViewFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    DynamicFormModule
  ], exports:[
    ViewFormComponent,
  ]
})
export class ViewFormModule { }
