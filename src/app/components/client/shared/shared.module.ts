import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ArticleListComponent, ArticleMetaComponent, ArticlePreviewComponent } from './article-helpers';
import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
import { AuthModule } from './../../../shared/shared-services/auth/auth.module';
import { MaterialModule } from './../../../shared/shared-module/material.module';
import { AvatarModule } from 'ngx-avatar';
import { InfiniteScrollModule } from './../../../shared/shared-components/infinite-scroll/infinite-scroll.module';
import { ScrollTopModule } from './../../../shared/shared-components/scrolltotop/scroll-top.module';
import { SanitizeHtmlPipe } from '../utils/sanitize-html.pipe';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
    MaterialModule,
    AvatarModule,
    InfiniteScrollModule,
    ScrollTopModule
  ],
  declarations: [
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    SanitizeHtmlPipe
  ],
  exports: [
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent,
    CommonModule,
    FavoriteButtonComponent,
    FollowButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
    MaterialModule,
    AvatarModule,
    ScrollTopModule,
    SanitizeHtmlPipe
    
  ]
})
export class SharedModule {}
