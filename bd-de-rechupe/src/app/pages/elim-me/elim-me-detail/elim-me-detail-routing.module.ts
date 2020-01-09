import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElimMeDetailPage } from './elim-me-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ElimMeDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElimMeDetailPageRoutingModule {}
