import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckboxCustomEvent } from '@ionic/angular';

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
            <div class="ion-page">
              <ion-content class="ion-padding">
                <ion-button id="open-modal" expand="block" fill="light">Abrir</ion-button>
                <ion-modal #modal trigger="open-modal" [canDismiss]="canDismiss" [presentingElement]="presentingElement">
                  <ng-template>
                    <ion-header>
                      <ion-toolbar>
                        <ion-title>Modal</ion-title>
                        <ion-buttons slot="end">
                          <ion-button (click)="modal.dismiss()">Cerrar</ion-button>
                        </ion-buttons>
                      </ion-toolbar>
                    </ion-header>
                    <ion-content>
                      <p class="ion-padding-horizontal">You must accept the terms and conditions to close this modal.</p>
                      <ion-item>
                        <ion-label class="ion-text-wrap" for="terms">Do you accept the terms and conditions?</ion-label>
                        <ion-checkbox id="terms" (ionChange)="onTermsChanged($event)" [checked]="canDismiss"></ion-checkbox>
                      </ion-item>
                    </ion-content>
                  </ng-template>
                </ion-modal>
              </ion-content>
          </div>
            

            
        </ion-card-content>
      </ion-card>


    </ion-content>
  `,
  styles: ['.linea { border-top: 1px solid black; height: 2px; max-width: 300px; padding: 0; margin: 0px auto 0 auto; }' ,
           '.titulo { color: #08474e; font-weight: bold; display: inline-block; size: 10px; font-size: xx-large;; }',
           'img{ width: 80%; height: 80%; }']
})



export class PageThreeComponent {
  canDismiss = false;
  presentingElement = null!;
  
  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page')!;
  }
  constructor(private router: Router) {
  }
  alLogin(){
    this.router.navigate(['/login'])

  }
   onTermsChanged(event: Event) {
    const ev = event as CheckboxCustomEvent;
    this.canDismiss = ev.detail.checked;
  }
}