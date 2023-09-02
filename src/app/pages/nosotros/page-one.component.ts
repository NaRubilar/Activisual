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
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, fugiat reprehenderit,
                saepe dolorum voluptas repudiandae vel at similique officiis eveniet non quidem exercitationem,
                labore quos aspernatur in autem modi aliquam! Lorem ipsum dolor</p>
                <br>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, fugiat reprehenderit,
                saepe dolorum voluptas repudiandae vel at similique officiis eveniet non quidem exercitationem,
                labore quos aspernatur in autem modi aliquam! Lorem ipsum dolor</p>

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