import { Component } from '@angular/core';

import { PageTwoComponent } from './page-two.component';

@Component({
  selector: 'app-page-one',
  template: `

    <ion-header [translucent]="true">
        <ion-toolbar >
            <ion-title>Nosotros</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content>
        <ion-card class="ion-text-center input-outline-container ion-padding">
        <img src="assets/img/equipo.png" alt="">
            <ion-card-header>
                <ion-card-title class="titulo">Nosotros</ion-card-title>
            </ion-card-header>
            <div class="linea"></div>

            <ion-card-content >
                <p>Descubre el mundo a través de tu lente con Photosight, la aplicación creada con pasión por Natalia Rubilar y Diego Isla, fundadores de Activisual. Nosotros, en Activisual, creemos que cada imagen tiene una historia que contar, y Photosight es la herramienta perfecta para que los amantes de la fotografía cuenten sus propias narrativas visuales.</p>
                <br>
                <p>Únete a la Revolución Visual con Activisual y Photosight. Tu historia visual está a solo un clic de distancia.</p>

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
           'img{ width: 80%; height: 80%; }']
})
export class PageOneComponent {
  component = PageTwoComponent;
}

/*
img{ width: 70%; height: 70%; }
*/