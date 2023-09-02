import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';



import { PageOneComponent } from './pages/nosotros/page-one.component';
import { PageTwoComponent } from './pages/nosotros/page-two.component';
import { PageThreeComponent } from './pages/nosotros/page-three.component';



@NgModule({
  declarations: [AppComponent, PageOneComponent, PageTwoComponent, PageThreeComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
