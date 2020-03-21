import { NgModule } from '@angular/core';
import { SharedPageRoutingModule } from './shared-pages-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../shared-module/shared.module';

@NgModule({
  declarations: [SettingsComponent,WelcomeComponent],
  imports: [
    SharedModule,
    SharedPageRoutingModule
  ] ,
  exports:[
    SettingsComponent,WelcomeComponent
  ],
 
})
export class SharedPagesModule { }
