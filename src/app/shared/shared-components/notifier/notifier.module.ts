import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierComponent } from './notifier.component';
import { CloseXIconComponent } from './icons/close-x-icon/close-x-icon.component';
import { AcceptIconComponent } from './icons/accept-icon/accept-icon.component';
import { FailIconComponent } from './icons/fail-icon/fail-icon.component';

@NgModule({
  declarations: [
    NotifierComponent,
    CloseXIconComponent,
    AcceptIconComponent,
    FailIconComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    NotifierComponent,
  ]
})
export class NotifierModule { }
