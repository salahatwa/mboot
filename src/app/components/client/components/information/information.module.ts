import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';
import { InformationComponent } from './information.component';
import { InformationRoutingModule } from './information-routing.module';
import { LogoFullModule } from './../../../../shared/shared-components/logoFull/logo-full.module';
import { NgxPayPalModule } from './../../../../shared/shared-components/ngx-paypal-lib/public_api';

@NgModule({
  declarations: [InformationComponent],
  imports: [
    SharedModule,
    TranslateModule,
    LogoFullModule,
    InformationRoutingModule,
    NgxPayPalModule
  ]
})
export class InformationModule { }
