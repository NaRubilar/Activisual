import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController, NavController } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, FileInfo, Filesystem, Encoding, ReaddirResult } from '@capacitor/filesystem';

import { Console } from 'console';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';

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

  constructor(private menuCtrl: MenuController,
              private alertController: AlertController,
              public navCtrl: NavController,
              private authService: AuthService,
              private firestore: FirestoreService,
              private router: Router) {}

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

}
