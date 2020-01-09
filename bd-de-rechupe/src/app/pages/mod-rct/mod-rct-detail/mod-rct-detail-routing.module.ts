import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModRctDetailPage } from './mod-rct-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ModRctDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModRctDetailPageRoutingModule {}
