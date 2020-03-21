import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoFullComponent } from './logoFull.component';

@NgModule({
  declarations: [LogoFullComponent],
  imports: [
    CommonModule
  ],
  exports:[LogoFullComponent]
})
export class LogoFullModule { }
