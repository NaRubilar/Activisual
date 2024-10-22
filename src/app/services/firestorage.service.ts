import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage"
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular'



@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor( private alertController : AlertController
  
              ) { }  

  storage = getStorage();
  refStorage = ref(this.storage, '')
  refStoragSting = ref(this.storage, 'Textos')

  message = 'This is my message.';

  generateFilename(nombre: string, counter: number): string {
    counter++;
    return `${nombre}${counter}`;
  }
    
  async uploadImage(file: any, path: string, nombre: string){
        const filePath = path + '/' + nombre + '.jpg' ;
        const fileRef = ref(this.refStorage,filePath);
        uploadBytes(fileRef, file ).then((snapshot) => {
          const mensaje = "foto guardada"
          this.presentToast(mensaje)
           
          });
        };
        
  subirString(message: string){
    uploadString(this.refStoragSting, message).then((snapshot) => {
      console.log('Uploaded a raw string!');
    });

  }      

  async presentToast(message: string) {
    console.log(message);

    const toast = await this.alertController.create({
      header: '',
      message: 'Se guardó la foto',
      buttons: ['Continuar']
    });

    //await toast.present();
  }
  
  

  }