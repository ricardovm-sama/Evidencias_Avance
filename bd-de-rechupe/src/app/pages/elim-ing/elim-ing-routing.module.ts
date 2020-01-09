import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElimIngPage } from './elim-ing.page';

const routes: Routes = [
  {
    path: '',
    component: ElimIngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElimIngPageRoutingModule {}
