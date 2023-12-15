import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckboxCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-page-one',
  template: `
    <ion-header class="ion-text-center">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center" >Nosotros</ion-title>
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
            <br>


            <div class="ion-page">
              <ion-content class="ion-padding">
                <ion-button class="ion-text-center" id="open-modal" fill="clear" expand="block" >Abrir</ion-button>
                <br>
                <p>Preciona el boton "Abrir para leer nuestros Términos y Condiciones"</p>

                  <ion-modal #modal trigger="open-modal" [canDismiss]="canDismiss" [presentingElement]="presentingElement">
                    <ng-template>
                      <ion-header>
                        <ion-toolbar>
                          <ion-title class="ion-text-center">Términos y Condiciones</ion-title>
                          <ion-buttons slot="end">
                            <ion-button (click)="modal.dismiss()" [routerLink]="['/login']">Aceptar</ion-button>
                          </ion-buttons>
                        </ion-toolbar>
                      </ion-header>
                      <ion-content class="ion-text-center container-fluid" >
                        <b>
                        <br>
                        Debe aceptar los términos y condiciones para cerrar este modal.</b>
                        <div class="ion-text-center ion-justify-content-center container" style=" margin:30px;">

                        <h2 class="ion-text-center">Aspectos Generales</h2>

                        <p >Te damos la bienvenida a PhotoSight.</p>
                        <p>
                          Estas Condiciones de uso (“Condiciones”) rigen el uso que haces de PhotoSight, excepto en aquellos casos en los que indiquemos de forma expresa que se aplican otras disposiciones en su lugar, y proporcionan información sobre el Servicio de PhotoSight (“Servicio”), en los términos descritos a continuación.
                          Cuando creas una cuenta de PhotoSight o usas PhotoSight, aceptas las presentes condiciones.
                          Las Condiciones del servicio de Meta no se aplican a este Servicio.
                        </p>

                        <p>El Servicio de PhotoSight es uno de los Productos de Meta que te proporciona Meta Platforms, Inc., por lo tanto, estas Condiciones de uso constituyen un acuerdo entre tú y dicha empresa.</p>

                        <h2 class="ion-text-center">Servicio de PhotoSight</h2>

                        <p>Aceptamos proporcionarte el Servicio de PhotoSight.
                          El Servicio incluye todos los productos, las funciones, las aplicaciones, los servicios, las tecnologías y el software de PhotoSight.
                          que ofrecemos para cumplir el propósito de la plataforma, esto es, conectarte con las personas y las cosas que te importan.
                        </p>
                        <p>El Servicio consiste en lo siguiente:</p>

                        <li><strong>Fomentar un entorno positivo, inclusivo y seguro:</strong></li>
                        <p>
                          Desarrollamos y empleamos herramientas y ofrecemos recursos a los miembros de nuestra comunidad para que sus experiencias sean integradoras y positivas, por ejemplo, cuando creemos que pueden necesitar ayuda.
                          También contamos con equipos y sistemas cuyo propósito es combatir el uso indebido y las infracciones de nuestras Condiciones y políticas, así como erradicar comportamientos perjudiciales y engañosos.
                          Utilizamos toda la información de la que disponemos, incluida la tuya, para proteger nuestra plataforma.
                          Asimismo, es posible que compartamos información sobre usos incorrectos o contenido dañino con otras Empresas de Meta o las autoridades.
                          Obtén más información en la Política de privacidad.
                        </p>

                        <li><strong>Garantizar el acceso a nuestro Servicio:</strong>.</li>
                        <p>
                          En aras del funcionamiento de nuestro Servicio global, debemos almacenar datos en nuestros sistemas en todo el mundo, incluidos los ubicados en lugares distintos de tu país de residencia, y transferir información entre dichos sistemas.
                          El uso de esta infraestructura global resulta necesario y esencial para prestar nuestro Servicio. Dicha infraestructura puede ser propiedad de Meta Platforms, Inc.,
                          Meta Platforms Ireland Limited o sus empresas afiliadas, o estar bajo su dirección.
                        </p>

                        <h2 class="ion-text-center">La Política de privacidad</h2>

                        <p>Para proporcionar nuestro Servicio, debemos recoger y usar tu información.
                          En la Política de privacidad se explica cómo recogemos, usamos y compartimos información en los Productos de Meta.
                          También se detalla de qué manera puedes controlar tu información, por ejemplo, desde la configuración de seguridad y privacidad de PhotoSight.
                          Debes aceptar la Política de privacidad para usar PhotoSight.
                        </p>

                        <h2 class="ion-text-center">Actualización de estas Condiciones</h2>

                        <p>Es posible que modifiquemos nuestro Servicio y nuestras políticas y que, en consecuencia, debamos actualizar estas Condiciones para que reflejen dichos Servicios y dichas políticas con precisión.
                          A menos que la ley disponga lo contrario, te enviaremos una notificación (por ejemplo, mediante nuestro Servicio) antes de modificar estas Condiciones, de modo que puedas consultar los cambios antes de que entren en vigor.
                          El uso del Servicio después de esta fecha supondrá la aceptación de las modificaciones efectuadas. Si no quieres aceptar estas disposiciones o las Condiciones actualizadas, puedes eliminar tu cuenta aquí.
                        </p>
                        <span>Última revisión: 14 diciembre de 2023</span>
                        </div>

                        <ion-item>
                          <ion-label class="ion-text-wrap" for="terms">¿Acepta los términos y condiciones?</ion-label>
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