import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleriafotosPageRoutingModule } from './galeriafotos-routing.module';

import { GaleriafotosPage } from './galeriafotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleriafotosPageRoutingModule
  ],
  declarations: [GaleriafotosPage]
})
export class GaleriafotosPageModule {}
