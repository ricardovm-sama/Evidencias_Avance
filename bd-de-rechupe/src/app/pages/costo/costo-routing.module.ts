import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostoPage } from './costo.page';

const routes: Routes = [
  {
    path: '',
    component: CostoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostoPageRoutingModule {}
