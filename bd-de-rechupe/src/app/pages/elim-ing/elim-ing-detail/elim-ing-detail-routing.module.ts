import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElimIngDetailPage } from './elim-ing-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ElimIngDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElimIngDetailPageRoutingModule {}
