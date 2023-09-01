import { Component } from '@angular/core';

import { PageThreeComponent } from './page-three.component';

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
            <img alt="Nosotros" src="https://impulso06.com/wp-content/uploads/2023/02/Roles-dentro-de-un-equipo-de-trabajo.png" />
            <ion-card-header>
                <ion-card-title class="titulo" >Lo que usamos</ion-card-title>
            </ion-card-header>

            <ion-card-content >
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, fugiat reprehenderit,
                saepe dolorum voluptas repudiandae vel at similique officiis eveniet non quidem exercitationem,
                labore quos aspernatur in autem modi aliquam! Lorem ipsum dolor</p>
                <br>
                <ion-button>GPS</ion-button>
                <br>
                <br>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, fugiat reprehenderit,
                saepe dolorum voluptas repudiandae vel at similique officiis eveniet non quidem exercitationem,
                labore quos aspernatur in autem modi aliquam! Lorem ipsum dolor</p>
                <br>
                <ion-button>Camara</ion-button>
                <br>
                <br>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                <br>

            <ion-nav-link router-direction="forward" [component]="component">
                <ion-button>Siguiente</ion-button>
            </ion-nav-link>

            </ion-card-content>
        </ion-card>
    </ion-content>
  `,
})
export class PageTwoComponent {
  component = PageThreeComponent;
}