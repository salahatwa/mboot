import { NgModule } from '@angular/core';
import { SharedPageRoutingModule } from './shared-pages-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared-module/shared.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    SharedModule,
    SharedPageRoutingModule
  ] ,
  exports:[
    SettingsComponent
  ],
 
})
export class SharedPagesModule { }
