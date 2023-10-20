import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestablecerpasswordPage } from './restablecerpassword.page';

const routes: Routes = [
  {
    path: '',
    component: RestablecerpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestablecerpasswordPageRoutingModule {}
