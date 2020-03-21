import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditableArticleResolver } from './editable-article-resolver.service';

import { EditorRoutingModule } from './editor-routing.module';
import { SharedModule } from '../../shared';
import { JoditAngularModule } from './../../../../shared/shared-components/editor/public_api';

@NgModule({
  imports: [SharedModule, EditorRoutingModule,JoditAngularModule],
  declarations: [EditorComponent],
  providers: [EditableArticleResolver]
})
export class EditorModule {}
