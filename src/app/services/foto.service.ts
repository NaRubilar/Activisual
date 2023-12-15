import { EventEmitter, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo, } from '@capacitor/camera';
import { Directory, FileInfo, Filesystem, Encoding, ReaddirResult } from '@capacitor/filesystem';
import { AlertController, MenuController, ModalController, NavController } from '@ionic/angular';
import { FirestorageService } from './firestorage.service';
import { File } from '@ionic-native/file/ngx'
import { StorageReference, getStorage, ref, uploadBytes, uploadString } from "firebase/storage"

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
  bytes: String;

  usuario: any;
  imageSource: any;
  guardar: any;

  constructor(private menuCtrl: MenuController,
              private alertController: AlertController,
              public navCtrl: NavController,
              private router: Router,
              private modalController: ModalController,
              private domSanitizer: DomSanitizer,
              private firestorage: FirestorageService,
              ) { }



  public async tomarFoto() {
    // Take a photo
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      saveToGallery: true
      
    });


    if(image){
      console.log('image:', image)
      this.guardarFoto(image.dataUrl);

      this.photos.unshift({
        filepath: "soon...",
        webviewPath: image.webPath!
      });
      this.fotoGuardada.emit(image.dataUrl);
      //Guardar en tipo dataUrl
      this.imagen=image.dataUrl;

      //Guardar en tipo dataUrl
      /*const imageData = image.base64String;
      this.bytes = imageData;
      const largo = this.bytes.length;
      const arr = new Uint8Array(largo);
  
      // Copy the decoded data to the Uint8Array
      for (let i = 0; i < this.bytes.length; i++) {
        arr[i] = this.bytes.charCodeAt(i);
      }
  
      // Create a Blob from the Uint8Array
      const blob = new Blob([arr], { type: 'image/jpg' });
      const fileName = this.firestorage.generateFilename('Foto', 2)

      this.firestorage.uploadImage(blob,'Imagenes', fileName)*/

      //this.getFotos();
      //console.log("Foto sacada");

    }

  }
    path: string = "TestImages";
    nombre: string = this.generateFilename( 'Test',2);
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