import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ApiService,
  JwtService,
  UserService
} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    ApiService,
    JwtService
  ],
  declarations: []
})
export class CoreModule { }
