import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaleriafotosPage } from './galeriafotos.page';

const routes: Routes = [
  {
    path: '',
    component: GaleriafotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaleriafotosPageRoutingModule {}
