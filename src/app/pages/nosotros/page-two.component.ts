import { Component } from '@angular/core';

import { PageThreeComponent } from './page-three.component';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({ 
  
  selector: 'app-page-two',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Nosotros</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
        <ion-card class=" ion-text-center input-outline-container ion-padding">

            <ion-card-header>
                <ion-card-title class="titulo" >Lo que usamos</ion-card-title>
            </ion-card-header>
            <div class="linea"></div>

            <ion-card-content >
            <img src="assets/img/mapa.png" alt="">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, fugiat reprehenderit,
                saepe dolorum voluptas repudiandae vel at similique officiis eveniet non quidem exercitationem,
                labore quos aspernatur in autem modi aliquam! Lorem ipsum dolor</p>
                <br>
                <ion-button>GPS</ion-button>
                <br>
                <br>
            <img class="photo" src="assets/img/camera.png" alt="">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, fugiat reprehenderit,
                saepe dolorum voluptas repudiandae vel at similique officiis eveniet non quidem exercitationem,
                labore quos aspernatur in autem modi aliquam! Lorem ipsum dolor</p>
                <br>
                <ion-button (click)="permisos()">Camara</ion-button>
                <br>
                <br>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                <br>

            <ion-nav-link router-direction="forward" [component]="component">
              <ion-button id="top-center" shape="round" size="small">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </ion-button>
            </ion-nav-link>

            </ion-card-content>
        </ion-card>
    </ion-content>
  `,
  styles: ['.linea { border-top: 1px solid black; height: 2px; max-width: 300px; padding: 0; margin: 0px auto 0 auto; }' ,
           '.titulo { color: #08474e; font-weight: bold; display: inline-block; size: 10px; font-size: xx-large;; }',
           'img{ width: 80%; height: 80%; }',
           '.photo{ width: 90%; height: 90%; }']
})
export class PageTwoComponent {
  component = PageThreeComponent;

  permisos(){
    Camera.requestPermissions();
  }
}

