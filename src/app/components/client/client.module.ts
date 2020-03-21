import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ClientAuthResolver } from './client-auth-resolver.service';
import { ClientRoutingModule } from './client-routing.module';
import { SharedComponentModule } from '../../shared/shared-module/shared-component.module';
import { AuthModule } from './../../shared/shared-services/auth/auth.module';

import { TagsService, ProfilesService, ArticlesService, CommentsService } from './services';
import { SharedModule } from './shared';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from './../../shared/shared-components/paging-lib/pagination.module';
import { NgMatAutocompleteModule } from './../../shared/shared-components/auto-complete/autocomplete.module';
import { TagsAutoCompleteService } from './services/tags.autocomplete.service';
import { NotifierModule } from './../../shared/shared-components/notifier/notifier.module';

@NgModule({
  declarations: [
     ClientComponent
    ],
  imports: [
    // BrowserModule,
    SharedModule,
    AuthModule,
    ClientRoutingModule,
    NgMatAutocompleteModule,
    NotifierModule
  ],
  providers: [
    ClientAuthResolver,
    TagsService,
    TagsAutoCompleteService,
    ProfilesService,
    ArticlesService,
    CommentsService
  ]
})
export class ClientModule { }
