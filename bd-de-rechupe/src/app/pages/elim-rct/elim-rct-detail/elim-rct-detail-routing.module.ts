import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElimRctDetailPage } from './elim-rct-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ElimRctDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElimRctDetailPageRoutingModule {}
