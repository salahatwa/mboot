
import { NgModule, ErrorHandler } from '@angular/core';


import { DriverRoutingModule } from './components/driver-builder/driver-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Services


// Directives

// Components
import { AppComponent } from './app.component';

// Modules

import { DriverBuilderModule } from './components/driver-builder/driver-builder.module';
import { SharedModule } from './shared/shared-module/shared.module';
import { CoreModule } from './shared/shared-services/core';
import { ClientModule } from './components/client/client.module';
import { SharedPagesModule } from './shared/shared-pages/shared-pages.module';

// import { NgProgressModule } from "ngx-progressbar";
// import { NgProgressHttpModule } from "ngx-progressbar/http";





// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  console.log("translate loader running..");
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // SharedComponentModule,
    ClientModule,
    CoreModule,
    SharedModule,
    SharedPagesModule,
    DriverBuilderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }) ,

    // NgProgressModule.withConfig({
    //   spinnerPosition: "left",
    //   color: "#f71cff"
    // }),
    // NgProgressHttpModule
 ],
  providers: [
    // AppServiceService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
  ],
})
export class AppModule { }
