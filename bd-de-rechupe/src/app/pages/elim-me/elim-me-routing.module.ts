import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElimMePage } from './elim-me.page';

const routes: Routes = [
  {
    path: '',
    component: ElimMePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElimMePageRoutingModule {}
