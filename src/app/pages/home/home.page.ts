import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, FileInfo, Filesystem, Encoding, ReaddirResult } from '@capacitor/filesystem';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {

  path: string = "TestImages";
  photos: string[]= [];


  usuario: any;

  constructor(private menuCtrl: MenuController,
              private alertController: AlertController,
              public navCtrl: NavController,
              private authService: AuthService,
              private firestore: FirestoreService) {}

  toggleMenu() {}

  ngOnInit() {
    Camera.requestPermissions();
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
          resultType: CameraResultType.Base64,
          source: CameraSource.Camera
        });

        if(image){
          this.guardarFoto(image.base64String!);
          this.getFotos();
        }
  };

  //==== Guardar Foto ====
  async guardarFoto(photo: string){
    await Filesystem.writeFile({
      path: this.path + '/Test3.jpg',
      data: photo,
      directory: Directory.Documents,
    });
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
        Filesystem.mkdir(
          {
            path: this.path,
            directory: Directory.Documents
          }
        )
      })
  }

  //==== Cargar Fotos ====
  cargarFotos(photos: FileInfo[]) {
    photos.forEach(file => {

      Filesystem.readFile({
        path: '${this.path}/${file.name}',
        directory: Directory.Documents
      }).then(photo => {
        this.photos.push('data:image/jpeg;base64,' + photo.data);
      })
    //PathLocationStrategy.forEach(photo => {
    });
  }

}
