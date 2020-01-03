import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemporadaPage } from './temporada.page';

const routes: Routes = [
  {
    path: '',
    component: TemporadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemporadaPageRoutingModule {}
