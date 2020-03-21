import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarLoaderComponent } from './progress-bar-loader.component';
import { ProgressBarLoaderService } from './progress-bar-loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressBarLoaderInterceptor } from './progress-bar-interceptor';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [ProgressBarLoaderComponent],
  exports:[ProgressBarLoaderComponent],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  providers:[
    ProgressBarLoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: ProgressBarLoaderInterceptor, multi: true }
  ]
})
export class ProgressBarLoaderModule { }
