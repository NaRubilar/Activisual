import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Usuarios} from 'src/app/models/models';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, FileInfo, Filesystem, Encoding, ReaddirResult } from '@capacitor/filesystem';
import { MenuController,ModalController  } from '@ionic/angular';
import { Console } from 'console';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { FirestoreService } from '../../services/firestore.service';
import { GooglemapsComponent } from '../../googlemaps/googlemaps.component';
import { FirestorageService } from '../../services/firestorage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FotoService } from '../../services/foto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {

  path: string = "TestImages";
  fotoUrl: any;
  photos: String[] = [];
  image: any;
  imagen: any;

  usuario: any;
  imageSource: any;
  guardar: any;

  usuarioMap: Usuarios = {
  usuario: '',
  correo: '',
  password: '',
  repetirPassword: '',
  ubicacion: null
};

  constructor(private menuCtrl: MenuController,
              private alertController: AlertController,
              public navCtrl: NavController,
              private authService: AuthService,
              private router: Router,
              private modalController: ModalController,
              private domSanitizer: DomSanitizer,
              private fotoService :FotoService ) {}

  //toggleMenu() {}

  ngOnInit() {
    this.fotoService.getFotos();

    // Escuchar el evento de foto guardada
    this.fotoService.fotoGuardada.subscribe((dataUrl: string) => {
      // Actualizar la galería con la nueva foto
      this.photos.unshift(dataUrl); // Agrega la nueva foto al principio de la lista
    });
  }

  //Cerrar Sesión
  async salir(){

    const alert = await this.alertController.create({
      message: '¿De verdad quieres cerrar sesion?',
      buttons: [
        {
          text: 'No',
          handler: () => {

          }
        }, {
          text: 'Si',
          handler: () => {
            localStorage.removeItem('Ingresado');
            console.log("Sesión Cerrada")
            this.navCtrl.navigateRoot('login');
          }
        }
      ]
    });
    await alert.present();
  };

  //==== Abrir Mapa ====
  tomarFoto() {
    this.fotoService.tomarFoto();
  }


  //==== Abrir Mapa ====
  async abrirMapa() {

    const ubicacion = this.usuarioMap.ubicacion;
    let positionInput = {
      lat: -33.033695220947266,
      lng: -71.53321075439453,
    };
    if (ubicacion !== null) {
        positionInput = ubicacion;
    }

    const modalAdd  = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      componentProps: {position: positionInput}
    });
    await modalAdd.present();

    const {data} = await modalAdd.onWillDismiss();
    if (data) {
      console.log('data -> ', data);
      this.usuarioMap.ubicacion = data.pos;
      console.log('this.usuarioMap -> ', this.usuarioMap);
    }
  }

}


