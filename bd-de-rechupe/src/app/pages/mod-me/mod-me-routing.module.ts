import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModMePage } from './mod-me.page';

const routes: Routes = [
  {
    path: '',
    component: ModMePage
  },
  {
    path: 'mod-me-detail',
    loadChildren: () => import('./mod-me-detail/mod-me-detail.module').then( m => m.ModMeDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModMePageRoutingModule {}
