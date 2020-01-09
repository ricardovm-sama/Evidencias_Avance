import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModIngPage } from './mod-ing.page';

const routes: Routes = [
  {
    path: '',
    component: ModIngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModIngPageRoutingModule {}
