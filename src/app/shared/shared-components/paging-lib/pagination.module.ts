import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPaginationComponent } from './components/custom-pagination/custom-pagination.component';
import { CustomPaginationService } from './services/custom-pagination.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared-module/material.module';

@NgModule({
  declarations: [CustomPaginationComponent],
  imports: [
    MaterialModule,
    CommonModule,
    // BrowserModule,
    RouterModule
  ],
  exports:[
    CustomPaginationComponent
  ],
  providers:[
    CustomPaginationService
  ]
})
export class PaginationModule { }
