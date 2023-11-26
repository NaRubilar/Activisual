import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild, Inject } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Usuarios} from 'src/app/models/models';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, FileInfo, Filesystem, Encoding, ReaddirResult } from '@capacitor/filesystem';
import { MenuController,ModalController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { FirestoreService } from '../../services/firestore.service';
import { GooglemapsService } from '../../services/googlemaps.service';
import { DOCUMENT } from '@angular/common';
import { Plugins } from '@capacitor/core';

const {Geolocation} = Plugins;

declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

})
export class HomePage implements OnInit {

  path: string = "TestImages";
  fotoUrl: any;
  photos: String[] = [];
  image: any;
  imagen: any;

  position = {
    lat: -33.33333333,
    lng: -71.0264333333
};
  usuario: any;
  imageSource: any;
  storage: any;
  map: any;
  marker: any;
  markerView: any;
  marker1: any;
  marker2: any;
  infowindow: any;
  positionSet: any;
  position1: any;
  position2: any;
  positionDuoc: any;
  beachFlagMarkerView: any;
  label: any;

  usuarioMap: Usuarios = {
  usuario: '',
  correo: '',
  password: '',
  repetirPassword: '',
  ubicacion: null
};

@ViewChild('map') divMap: ElementRef;

  constructor(private menuCtrl: MenuController,
              private alertController: AlertController,
              public navCtrl: NavController,
              private authService: AuthService,
              private router: Router,
              private modalController: ModalController,
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document,
              private googlemapsService: GooglemapsService,) {}

  //toggleMenu() {}

  ngOnInit() {
    this.init();
    console.log('position ->', this.position)
    this.mylocation();

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

  async init() {

    this.googlemapsService.init(this.renderer, this.document).then( () => {
          this.initMap();
    }).catch( (err) => {
          console.log(err);
    });
  }
  initMap() {
    const position = this.position;
    this.positionDuoc = { lat: -33.033695220947266, lng: -71.53321075439453 };

    let latLng = new google.maps.LatLng(position.lat, position.lng);

    let mapOptions = {
          center: latLng,
          zoom: 15,
          disableDefaultUI: false,
          clickableIcons: false,
          setClickableIcons: true,
    };

    this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);

    this.map.addListener('mapcapabilities_changed', () => {
          const mapCapabilities = this.map.getMapCapabilities();
    });

    this.label = {
    titulo:'Estas Aquí',
    subtitulo: 'Desubicado'
}
    this.marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          draggable: false,
          panTo: latLng,
          icon: {
                url: 'assets/icon/Marker1.png'

                }
    });

    this.infowindow = new google.maps.InfoWindow();

    this.addMarker(this.position);

    this.markerView = new google.maps.Marker({
          map:this.map,
          position: this.positionDuoc,
          icon: {
                url: 'assets/icon/marker5.png'

                }

    })
    this.addMarkers(this.positionDuoc)

    // Jardin Botanico -33.048674782518226, -71.49779906163025
    this.position1 = {
          lat: -33.048674782518226,
          lng: -71.49779906163025
    };
    //this.setInfoWindow(this.markerView, 'Punto Duoc', 'Saca tu foto');

    this.marker1 = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          draggable: false,
          position: this.position1,
          icon: {
                url: 'assets/icon/marker5.png'

                }

    })
    this.addMarkers(this.position1)

    //Cerro Alegre Valparaiso -33.043806258896325, -71.62657360068589 
    this.position2 = {
          lat: -33.043806258896325,
          lng: -71.62657360068589
    };

    this.marker2 = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          draggable: false,
          position: this.position2,
          icon: {
                url: 'assets/icon/marker5.png'

                }
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
