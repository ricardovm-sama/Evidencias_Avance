import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElimRctPage } from './elim-rct.page';

const routes: Routes = [
  {
    path: '',
    component: ElimRctPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElimRctPageRoutingModule {}
