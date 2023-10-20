import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotfoundpagePageRoutingModule } from './notfoundpage-routing.module';

import { NotfoundpagePage } from './notfoundpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotfoundpagePageRoutingModule
  ],
  declarations: [NotfoundpagePage]
})
export class NotfoundpagePageModule {}
