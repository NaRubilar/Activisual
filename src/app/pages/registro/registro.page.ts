import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Usuarios } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioReg: FormGroup;

  constructor(public fb: FormBuilder,
              private alertController: AlertController,
              public navCtrl: NavController,
              private firestore: FirestoreService) {

    this.formularioReg = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'correo': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'repetirPassword': new FormControl("",Validators.required)

    });
  }

  ngOnInit() {
  }

  public generaCadenaAleatoria(n: number): string {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < n; i++){
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async guardar(){
    var f = this.formularioReg.value;

    if(this.formularioReg.invalid){
      const alert = await this.alertController.create({
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    const usuarios: Usuarios = {
      usuario: f.usuario,
      correo: f.correo,
      password: f.password,
      repetirPassword: f.repetirPassword
    }
    const path = 'Usuarios'
    var id: string =this.generaCadenaAleatoria(15);

    this.firestore.createDoc(usuarios,path,id)

    this.navCtrl.navigateRoot('home');


  }

}
