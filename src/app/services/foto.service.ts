import { EventEmitter, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, FileInfo, Filesystem, Encoding, ReaddirResult } from '@capacitor/filesystem';
import { AlertController, MenuController, ModalController, NavController } from '@ionic/angular';
import { FirestorageService } from './firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  fotoGuardada = new EventEmitter<string>();
  fotoUrl: any;
  photos: String[] = [];
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


  //==== Tomar Fotos ====
  async tomarFoto () {
    const image = await Camera.getPhoto({
      quality: 90,
      //allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      saveToGallery: true
    });

    if(image){
      console.log('image:', image)
      this.firestorage.uploadImage(image,'Fotos.jpg', this.firestorage.generateFilename('Foto', 1))
      this.guardarFoto(image.dataUrl);
      this.fotoGuardada.emit(image.dataUrl);
      //Guardar en tipo dataUrl
      this.imagen=image.dataUrl;

      //Guardar en tipo dataUrl
      //this.imageData = image.base64String;



      this.getFotos();
      console.log("Foto sacada");

    }
  };

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
      this.photos = []; // Limpiar la lista antes de cargar las nuevas fotos
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
      console.log("Foto consegida (get)");
  }

  //==== Cargar Fotos ====
  cargarFotos(photos: FileInfo[]) {
    photos.forEach(file => {

      Filesystem.readFile({
        path: `${this.path}/${file.name}`,
        directory: Directory.Documents
      }).then(photo => {
        this.photos.push('data:image/jpeg;dataUrl,' + photo.data);
      })
    });
    console.log("Foto cargada");
  }
  
  generateFilename(prefix: string, counter: number): string {
    counter++;
    return `${prefix}${counter}`;
  }

}

