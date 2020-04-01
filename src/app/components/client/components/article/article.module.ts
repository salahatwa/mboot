import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArticleComponent } from './article.component';
import { ArticleCommentComponent } from './article-comment.component';
import { ArticleResolver } from './article-resolver.service';
import { SanitizeHtmlPipe } from '../../utils/sanitize-html.pipe';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '../../shared';
import { ShareModule } from '@ngx-share/core';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ViewFormModule } from './../../../../components/ui-form-builder/view-form/view-form.module';
import { ScrollTopModule } from './../../../../shared/shared-components/scrolltotop/scroll-top.module';

@NgModule({
  imports: [
    SharedModule,
    ArticleRoutingModule,
    ShareModule,
    ViewFormModule,
    ScrollTopModule,
    DeviceDetectorModule.forRoot()
  ],
  declarations: [
    ArticleComponent,
    ArticleCommentComponent,
    // SanitizeHtmlPipe
  ],

  providers: [
    ArticleResolver
  ]
})
export class ArticleModule {}
