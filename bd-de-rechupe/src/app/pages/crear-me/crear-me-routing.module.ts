import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearMePage } from './crear-me.page';

const routes: Routes = [
  {
    path: '',
    component: CrearMePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearMePageRoutingModule {}
