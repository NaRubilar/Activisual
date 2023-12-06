import { EventEmitter, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, FileInfo, Filesystem, Encoding, ReaddirResult } from '@capacitor/filesystem';
import { AlertController, MenuController, ModalController, NavController } from '@ionic/angular';
import { FirestorageService } from './firestorage.service';


@Injectable({
  providedIn: 'root'
})
export class FotoService {
  public photos: UserPhoto[] = [];
  fotoGuardada = new EventEmitter<string>();
  fotoUrl: any;
  //photos: String[] = [];
  image: any;
  imagen: any;

  usuario: any;
  imageSource: any;
  guardar: any;

  constructor(private menuCtrl: MenuController,
              private alertController: AlertController,
              public navCtrl: NavController,
              private router: Router,
              private modalController: ModalController,
              private domSanitizer: DomSanitizer,
              private firestorage: FirestorageService) { }



  public async tomarFoto() {
    // Take a photo
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90,
      saveToGallery: true
    });


    if(image){
      console.log('image:', image)
      this.firestorage.uploadImage(image,'Fotos.jpg', this.firestorage.generateFilename('Foto', 1))
      this.guardarFoto(image.dataUrl);

      this.photos.unshift({
        filepath: "soon...",
        webviewPath: image.webPath!
      });

      this.getFotos();
      console.log("Foto sacada");

    }

  }
    path: string = "TestImages";
    nombre: string = this.generateFilename( 'Test',4);



  //==== Guardar Foto ====
  async guardarFoto(photo: string){
    const resp = await Filesystem.writeFile({
      path: this.path + '/' + this.nombre + '.jpg' ,
      data: photo,
      directory: Directory.Documents,
    });
    console.log('Respuesta de escritura de archivo:', resp);
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
      console.log('Archivos:', files);
      this.cargarFotos(files.files);

    }).catch(err => {
        console.log(err);
        console.error('Error al leer archivos:', err);
        Filesystem.mkdir(
          {
            path: this.path,
            directory: Directory.Documents
          }
        )
      })
      console.log("La path: ", this.path);
      console.log("Foto consegida (get)");
  }

  //==== Cargar Fotos ====
  cargarFotos(photos: FileInfo[]) {
    photos.forEach(file => {

      Filesystem.readFile({
        path: `${this.path}/${file.name}`,
        directory: Directory.Documents
      }).then(photo => {
        this.photos.push('data:image/jpeg;dataUrl,' + photo.data as unknown as UserPhoto);
      })
    });
    console.log("Foto cargada");
  }

  generateFilename(prefix: string, counter: number): string {
    counter++;
    return `${prefix}${counter}`;
  }

}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}