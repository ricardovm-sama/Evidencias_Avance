import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ingreso', pathMatch: 'full' },
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
    path: 'elim-me',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/elim-me/elim-me.module').then( m => m.ElimMePageModule)
      },
      {
        path: ':materialexternoId',
        loadChildren: () => import('./pages/elim-me/elim-me-detail/elim-me-detail.module').then( m => m.ElimMeDetailPageModule)
      }
    ]
  },
  {
    path: 'mod-ing',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/mod-ing/mod-ing.module').then( m => m.ModIngPageModule)
      },
      {
        path: ':ingredienteId',
        loadChildren: () => import('./pages/mod-ing/mod-ing-detail/mod-ing-detail.module').then( m => m.ModIngDetailPageModule)
      }
    ]
  },
  {
    path: 'elim-ing',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/elim-ing/elim-ing.module').then( m => m.ElimIngPageModule)
      },
      {
        path: ':ingredienteId',
        loadChildren: () => import('./pages/elim-ing/elim-ing-detail/elim-ing-detail.module').then( m => m.ElimIngDetailPageModule)
      }
    ]
  },
  {
    path: 'mod-rct',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/mod-rct/mod-rct.module').then( m => m.ModRctPageModule)
      },
      {
        path: ':recetaId',
        loadChildren: () => import('./pages/mod-rct/mod-rct-detail/mod-rct-detail.module').then( m => m.ModRctDetailPageModule)
      }
    ]
  },
  {
    path: 'elim-rct',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/elim-rct/elim-rct.module').then( m => m.ElimRctPageModule)
      },
      {
        path: ':recetaId',
        loadChildren: () => import('./pages/elim-rct/elim-rct-detail/elim-rct-detail.module').then( m => m.ElimRctDetailPageModule)
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
  },
  {
    path: 'crear-ing',
    loadChildren: () => import('./pages/crear-ing/crear-ing.module').then( m => m.CrearIngPageModule)
  },
  {
    path: 'crear-rct',
    loadChildren: () => import('./pages/crear-rct/crear-rct.module').then( m => m.CrearRctPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
