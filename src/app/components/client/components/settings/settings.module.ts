import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../../shared';
import { ProfilePictureModule } from './../../../../shared/shared-components/profile-picture/profile-picture.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    SharedModule,
    TranslateModule,
    SettingsRoutingModule,
    ProfilePictureModule,
    
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule {}
