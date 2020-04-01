import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';


import { HttpClientModule, HttpClient } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatButtonModule, MatMenuModule, MatIconModule, MatDividerModule, MatTooltipModule, 
  MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule,
  MatListModule, MatSelectModule, MatSlideToggleModule, MatRippleModule, MatChipsModule, MatTreeModule, MatRadioButton, MatRadioModule, MatSidenavModule, MatToolbarModule, MatGridListModule, MatCardModule } from '@angular/material';
import { SpinnerContainerComponent } from '../shared-components/spinner/spinner-container.component';
import { SpinnerService } from '../shared-components/spinner/spinner.service';
import { DynamicOverlay } from '../shared-components/spinner/dynamic-overlay.service';
import { DynamicOverlayContainer } from '../shared-components/spinner/dynamic-overlay-container.service';
import { JoditAngularModule } from '../shared-components/editor/public_api';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from './shared-component.module';
import { MaterialModule } from './material.module';
import { SharedPagesModule } from '../shared-pages/shared-pages.module';
import { ListErrorsComponent } from '../shared-services/auth/error-component/list-errors.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ScrollTopModule } from '../shared-components/scrolltotop/scroll-top.module';


@NgModule({
  declarations: [SpinnerContainerComponent],
  imports: [
    // SharedPagesModule,
    
    SharedComponentModule,
    TranslateModule,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    JoditAngularModule,
    ReactiveFormsModule,
    ScrollTopModule
    
  ],
  exports:[
    SharedComponentModule,
    TranslateModule,
    SpinnerContainerComponent,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    JoditAngularModule,
    ReactiveFormsModule,ScrollTopModule],
  providers: [
    SpinnerService,DynamicOverlay,DynamicOverlayContainer,
  ] ,
  entryComponents: [
    SpinnerContainerComponent
  ]
})
export class SharedModule { }
