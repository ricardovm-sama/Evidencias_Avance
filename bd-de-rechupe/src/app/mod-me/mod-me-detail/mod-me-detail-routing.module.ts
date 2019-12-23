import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModMeDetailPage } from './mod-me-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ModMeDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModMeDetailPageRoutingModule {}
