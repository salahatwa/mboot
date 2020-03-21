import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestViewRoutingModule } from './request-view-routing.module';
import { SharedModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';
import {RequestViewComponent} from './request-view.component';
import { PaginationModule } from './../../../../shared/shared-components/paging-lib/pagination.module';

@NgModule({
  declarations: [RequestViewComponent],
  imports: [
    // CommonModule,
    SharedModule,
    PaginationModule,
    TranslateModule,
    RequestViewRoutingModule,
  ]
})
export class RequestViewModule { }
