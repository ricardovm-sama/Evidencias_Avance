import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCheckPage } from './modal-check.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCheckPageRoutingModule {}
