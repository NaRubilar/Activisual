import { Component } from '@angular/core';

import { PageThreeComponent } from './page-three.component';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

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
                <p>El permiso para acceder al GPS es fundamental para potenciar tu experiencia de exploración visual con Photosight. Al permitirnos acceder a tu ubicación, podemos ofrecerte la oportunidad de fotografiar zonas específicas que hemos asignado, guiándote hacia lugares fascinantes y permitiéndote descubrir joyas ocultas.</p>
                <br>
                <ion-button (click)="permisoGps()">GPS</ion-button>
                <br>
                <br>
            <img class="photo" src="assets/img/camera.png" alt="">
                <p>Photosight solicita acceso a tu cámara para desatar tu creatividad visual. Permitirnos acceder a tu cámara te brinda la capacidad de capturar momentos preciosos y explorar tu entorno a través de la lente.</p>
                <br>
                <ion-button (click)="permisoCamara()">Camara</ion-button>
                <br>
                <br>
                <p>Tu capacidad para explorar y documentar el mundo a tu alrededor se amplía, permitiéndote ser parte de la rica narrativa visual que estamos construyendo juntos en Activisual.</p>
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

  permisoCamara(){
    Camera.requestPermissions();

  }

  permisoGps(){
    Geolocation.requestPermissions()

}

}