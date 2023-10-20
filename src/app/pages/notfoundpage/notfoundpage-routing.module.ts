import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotfoundpagePage } from './notfoundpage.page';

const routes: Routes = [
  {
    path: '',
    component: NotfoundpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotfoundpagePageRoutingModule {}
