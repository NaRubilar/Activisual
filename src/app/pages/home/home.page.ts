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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {

  path: string = "TestImages";
  photos: string[] = [];
  fotoUrl: any;

  
  usuario: any;
  imageSource: any;
  storage: any;
  
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
              private firestore: FirestoreService,
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
        const image = await Camera.getPhoto({
          quality: 50,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          saveToGallery: true
        });

        /*
        this.router.navigate(['/galeriafotos'], {
          state: {
            fotoUrl: image.webPath
          }
        });*/

        if(image){
          this.guardarFoto(this.storage.getCollection()); //image.base64String!
          this.getFotos();
          console.log("Foto sacada");

        }
  };


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

  async addDirection() {

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
