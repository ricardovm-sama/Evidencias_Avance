import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'mainmenu', pathMatch: 'full' },
  {
    path: 'ingreso',
    loadChildren: () => import('./pages/ingreso/ingreso.module').then( m => m.IngresoPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'mainmenu',
    loadChildren: () => import('./pages/mainmenu/mainmenu.module').then( m => m.MainmenuPageModule)
  },
  {
    path: 'costo',
    loadChildren: () => import('./pages/costo/costo.module').then( m => m.CostoPageModule)
  },
  {
    path: 'mod-me',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/mod-me/mod-me.module').then( m => m.ModMePageModule)
      },
      {
        path: ':materialexternoId',
        loadChildren: () => import('./pages/mod-me/mod-me-detail/mod-me-detail.module').then( m => m.ModMeDetailPageModule)
      }
    ]
  },
  {
    path: 'vn',
    loadChildren: () => import('./pages/vn/vn.module').then( m => m.VnPageModule)
  },
  {
    path: 'realizar',
    loadChildren: () => import('./pages/realizar/realizar.module').then( m => m.RealizarPageModule)
  },
  {
    path: 'temporada',
    loadChildren: () => import('./pages/temporada/temporada.module').then( m => m.TemporadaPageModule)
  },
  {
    path: 'crear-me',
    loadChildren: () => import('./pages/crear-me/crear-me.module').then( m => m.CrearMePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
