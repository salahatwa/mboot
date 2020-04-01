import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollTopComponent } from './scroll-top.component';
import { MaterialModule } from '../../shared-module/material.module';

@NgModule({
  declarations: [ScrollTopComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    ScrollTopComponent
  ]
})
export class ScrollTopModule { }
