import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearIngPage } from './crear-ing.page';

const routes: Routes = [
  {
    path: '',
    component: CrearIngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearIngPageRoutingModule {}
