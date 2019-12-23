import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ingreso', pathMatch: 'full' },
  {
    path: 'ingreso',
    loadChildren: () => import('./ingreso/ingreso.module').then( m => m.IngresoPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'mod-me',
    children: [
      {
        path: '',
        loadChildren: () => import('./mod-me/mod-me.module').then( m => m.ModMePageModule)
      },
      {
        path: ':materialexternoId',
        loadChildren: () => import('./mod-me/mod-me-detail/mod-me-detail.module').then( m => m.ModMeDetailPageModule)
      }
    ]
  },
  {
    path: 'mainmenu',
    loadChildren: () => import('./mainmenu/mainmenu.module').then( m => m.MainmenuPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
