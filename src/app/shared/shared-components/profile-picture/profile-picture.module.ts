import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePictureComponent } from './profile-picture.component';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ProfilePictureComponent],
  imports: [
    CommonModule, HttpClientModule,
    FileUploadModule
  ],
  exports:[
    ProfilePictureComponent
  ]
})
export class ProfilePictureModule { }
