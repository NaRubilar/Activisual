import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Usuarios } from 'src/app/models/models';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, FileInfo, Filesystem, Encoding, ReaddirResult } from '@capacitor/filesystem';
import { MenuController,ModalController  } from '@ionic/angular';
import { Console } from 'console';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { FirestoreService } from '../../services/firestore.service';
import { GooglemapsComponent } from '../../googlemaps/googlemaps.component';
import { FirestorageService } from '../../services/firestorage.service';
import { MostrarImagenModalComponent } from 'src/app/mostrarImagen/mostrar-imagen-modal/mostrar-imagen-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {

  path: string = "TestImages";
  fotoUrl: any;
  photos: string[] = [];
  image: any;

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
              private modalController: ModalController) {}

  //toggleMenu() {}

  ngOnInit() {
    this.getFotos();
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


  //==== Tomar Fotos ====
  async tomarFoto() {
    try{
        const image = await Camera.getPhoto({
          quality: 50,
          //allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          saveToGallery: true
        });

        if(image){
          console.log('image:', image)
          this.image = image.dataUrl;
          const blob = this.dataURLtoBlob(image.dataUrl);
          this.guardarFoto(this.guardar.getCollection()); //image.base64String!
          this.getFotos();
          console.log("Foto sacada");

        }
      } catch (e) {
        console.log(e)
      }
  };

  dataURLtoBlob(dataurl: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }

  //==== Guardar Foto ====
  async guardarFoto(photo: string){
    const resp = await Filesystem.writeFile({
      path: this.path + '/Test3.jpg',
      data: photo,
      directory: Directory.Documents,
    });
    console.log("Foto guardada");
    this.navCtrl.navigateRoot('home');
  }

  getFotos() {
    Filesystem.readdir(
      {
        path: this.path,
        directory: Directory.Documents
      }
    ).then(files => {
      this.cargarFotos(files.files);

    }).catch(err => {
        console.log(err);
        console.log("Error");
        Filesystem.mkdir(
          {
            path: this.path,
            directory: Directory.Documents
          }
        )
      })
    console.log("Foto consegida (get)");
  }

  //==== Cargar Fotos ====
  cargarFotos(photos: FileInfo[]) {
    photos.forEach(file => {

      Filesystem.readFile({
        path: `${this.path}/${file.name}`,
        directory: Directory.Documents
      }).then(photo => {
        this.photos.push('data:image/jpeg;base64,' + photo.data);
      })
    });
    console.log("Foto cargada");
  }

  async mostrarImagen(photo: string) {
    const modal = await this.modalController.create({
      component: MostrarImagenModalComponent,
      componentProps: {
        imagen: photo,
      },
    });

    return await modal.present();
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


