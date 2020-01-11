import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearRctPage } from './crear-rct.page';

const routes: Routes = [
  {
    path: '',
    component: CrearRctPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearRctPageRoutingModule {}
