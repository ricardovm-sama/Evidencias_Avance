import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VnPage } from './vn.page';

const routes: Routes = [
  {
    path: '',
    component: VnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VnPageRoutingModule {}
