import { NgModule } from '@angular/core';
import { HeaderComponent } from '../shared-components/header/header.component';
import { MaterialModule } from './material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarLoaderModule } from '../shared-components/progress-bar-loader/progress-bar-loader.module';
import { SidenavComponent } from '../shared-components/sidenav/sidenav.component';
import { MatGridListResponsiveModule } from '../shared-components/mat-grid-list-responsive/mat-grid-list-responsive.module';
import { AuthModule } from '../shared-services/auth/auth.module';
import { PaginationModule } from '../shared-components/paging-lib/pagination.module';
import { NotFoundModule } from '../shared-pages/not-found/not-found.module';
import { AvatarModule } from 'ngx-avatar';
import { LogoFullModule } from '../shared-components/logoFull/logo-full.module';
import { NgxPayPalModule } from '../shared-components/ngx-paypal-lib/public_api';

@NgModule({
  declarations: [HeaderComponent,SidenavComponent],
  imports: [
    AuthModule,
    PaginationModule,
    TranslateModule,
    MaterialModule,
    ProgressBarLoaderModule,
    MatGridListResponsiveModule,
    NotFoundModule,
    AvatarModule,
    LogoFullModule
  ] ,
  exports:[
    PaginationModule,
    HeaderComponent,
    SidenavComponent,
    ProgressBarLoaderModule,
    MatGridListResponsiveModule,
    NotFoundModule,
    LogoFullModule,
    NgxPayPalModule
  ],
 
})
export class SharedComponentModule { }
