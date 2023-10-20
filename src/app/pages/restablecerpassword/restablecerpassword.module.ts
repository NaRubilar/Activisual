import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestablecerpasswordPageRoutingModule } from './restablecerpassword-routing.module';

import { RestablecerpasswordPage } from './restablecerpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestablecerpasswordPageRoutingModule
  ],
  declarations: [RestablecerpasswordPage]
})
export class RestablecerpasswordPageModule {}
