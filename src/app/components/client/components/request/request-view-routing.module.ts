import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../../shared/shared-services/core';
import { RequestViewComponent } from './request-view.component';

const routes: Routes = [
  {
    path: '',
    component: RequestViewComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestViewRoutingModule {}
