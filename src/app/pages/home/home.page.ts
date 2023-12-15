import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild, Inject } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Usuarios} from 'src/app/models/models';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, FileInfo, Filesystem,Encoding, ReaddirResult, FilesystemPlugin } from '@capacitor/filesystem';
import { MenuController,ModalController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { FirestoreService } from '../../services/firestore.service';
import { GooglemapsService } from '../../services/googlemaps.service';
import { DOCUMENT } from '@angular/common';
import { Plugins } from '@capacitor/core';
import {FotoService} from '../../services/foto.service'
import {FirestorageService} from '../../services/firestorage.service'



const {Geolocation} = Plugins;

declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

})
export class HomePage implements OnInit {
  imageFile: File;
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
              private googlemapsService: GooglemapsService,
              private fotoService : FotoService,
              private firestorage: FirestorageService
              ) {}

  //toggleMenu() {}

  ngOnInit() {
    this.init();  
    console.log('position ->', this.position)
    this.firestorage.subirString('vaaamos que se guarda esta cagá')
    
    //this.getFotos();
  
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

  //==== Tomar foto====
  tomarFoto() {
    const myMarkerPosition = this.marker.getPosition();

// Obtenemos la posición del marcador del punto de foto
    const puntoFotoPositionDuoc = this.markerView.getPosition();
    const puntoFotoPosition1 = this.marker1.getPosition()
    const puntoFotoPosition2 = this.marker2.getPosition()

// Calculamos la distancia entre los dos marcadores
const distance = google.maps.geometry.spherical.computeDistanceBetween(
    myMarkerPosition,
    puntoFotoPositionDuoc);
const distance2 = google.maps.geometry.spherical.computeDistanceBetween(
    myMarkerPosition,
    puntoFotoPosition1);
      
const distance3 = google.maps.geometry.spherical.computeDistanceBetween(
    myMarkerPosition,
    puntoFotoPosition2); 


if (distance <= this.marker.radius || 
    distance2 <= this.marker.radius ||
    distance3 <= this.marker.radius ) {

      this.fotoService.tomarFoto();
      this.presentToast('Foto guardada')

} else {
  this.presentToast('Necesitas estar a menos de 300 mts de alguno de los puntos de foto para poder tomar una foto')
}

    

  }
  async presentToast(message: string) {
    console.log(message);

    const toast = await this.alertController.create({
      header: '',
      message: message,
      buttons: ['Continuar']
    });
    await toast.present();
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
          radius: 300,
          icon: {
                url: 'assets/icon/Marker1.png'
                }                
    });

    
    this.infowindow = new google.maps.InfoWindow();
    this.mylocation();
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
    this.addMarkers(this.position2)

  }

  addMarker(position: any): void {

    let latLng = new google.maps.LatLng(position.lat, position.lng);

    this.marker.setPosition(latLng);
    this.map.panTo(position);
    this.positionSet = position;

}
addMarkers(position: any): void {

    if(position == this.position1){

          let latLng = new google.maps.LatLng(position.lat, position.lng);
          this.marker1.setPosition(latLng);
          this.positionSet = position;

    }else if (position == this.position2) {
          let latLng = new google.maps.LatLng(position.lat, position.lng)
          this.marker2.setPosition(latLng);
          this.positionSet = position;

    }else if (position == this.positionDuoc) {
          let latLng = new google.maps.LatLng(position.lat, position.lng)
          this.markerView.setPosition(latLng);
          this.positionSet = position;

    }else{
          console.log('error en esta wea ')
    }


}


setInfoWindow(marker: any, titulo: string, subtitulo: string) {

    const contentString  =  '<div id="contentInsideMap">' +
                            '<div>' +
                            '</div>' +
                            '<p style="font-weight: bold; margin-bottom: 5px;">' + titulo + '</p>' +
                            '<div id="bodyContent">' +
                            '<p class"normal m-0">'
                            + subtitulo + '</p>' +
                            '</div>' +
                            '</div>';
    this.infowindow.close();
    this.infowindow.setContent(contentString);
    this.infowindow.open(marker.map, marker);


}
positionActiva: any;
async mylocation() {
    console.log('mylocation() click');

    try {

        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        console.log('mylocation() -> get ', position);

        const markerPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        this.addMarker(markerPosition);

        // Crea un rango zonal
        const circleOptions = {
          center: markerPosition,
          radius: 300,
          fillColor: '#71f4d5',
          fillOpacity: 0.3,
          strokeOpacity: 0.5,
          strokeWeight: 2,
        };

        // Agrega el rango zonal al mapa
        const circle = new google.maps.Circle(circleOptions);
        circle.setMap(this.map);

        this.map.myLocationEnabled = true;
    } catch (error) {
        console.error('Error getting current position:', error);
    }

  }

}


