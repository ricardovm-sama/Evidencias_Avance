import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModRctPage } from './mod-rct.page';

const routes: Routes = [
  {
    path: '',
    component: ModRctPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModRctPageRoutingModule {}
