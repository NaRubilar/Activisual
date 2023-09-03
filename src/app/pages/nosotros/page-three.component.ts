import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-one',
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
      <ion-card class="ion-text-center input-outline-container ion-padding">
      <img src="assets/img/condition.png" alt="">
        <ion-card-header>
            <ion-card-title class="titulo" >Términos y Condiciones</ion-card-title>
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
            <ion-checkbox>Acepta los términos y condiciones de uso</ion-checkbox>
            <br>
            <br>
            <ion-button class=" ion-align-items-center" (click)="alLogin()">Comenzar</ion-button>

            
        </ion-card-content>
      </ion-card>


    </ion-content>
  `,
  styles: ['.linea { border-top: 1px solid black; height: 2px; max-width: 300px; padding: 0; margin: 0px auto 0 auto; }' ,
           '.titulo { color: #08474e; font-weight: bold; display: inline-block; size: 10px; font-size: xx-large;; }',
           'img{ width: 80%; height: 80%; }']
})
export class PageThreeComponent {

  constructor(private router: Router) { }


  alLogin(){
    this.router.navigate(['/login'])
  }
}