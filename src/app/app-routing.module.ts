import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoIngresadoGuard } from './guardianes/no-ingresado.guard';
import { IngresadoGuard } from './guardianes/ingresado.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  {
    path: 'nosotros',
    redirectTo: 'nosotros',
    pathMatch: 'full'
  },

  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'registro',
    redirectTo: 'registro',
    pathMatch: 'full'
  },

  {
    path: 'restablecerpassword',
    redirectTo: 'restablecerpassword',
    pathMatch: 'full'
  },

  {
    path: 'galeriafotos',
    redirectTo: 'galeriafotos',
    pathMatch: 'full'
  },

  {
    path: 'inicio',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'notfoundpage',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./pages/nosotros/nosotros.module').then( m => m.NosotrosPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'restablecerpassword',
    loadChildren: () => import('./pages/restablecerpassword/restablecerpassword.module').then( m => m.RestablecerpasswordPageModule)
  },
  {
    path: 'notfoundpage',
    loadChildren: () => import('./pages/notfoundpage/notfoundpage.module').then( m => m.NotfoundpagePageModule)
  },
  {
    path: 'galeriafotos',
    loadChildren: () => import('./pages/galeriafotos/galeriafotos.module').then( m => m.GaleriafotosPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
