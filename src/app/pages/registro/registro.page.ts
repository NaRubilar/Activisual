import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioReg: FormGroup;

  constructor(public fb: FormBuilder,
              private alertController: AlertController,
              public navCtrl: NavController) {

    this.formularioReg = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'correo': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'repetirPassword': new FormControl("",Validators.required)

    });
  }

  ngOnInit() {
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

    var usuarios = {
      usuario: f.usuario,
      password: f.password
    }

    localStorage.setItem('usuarios',JSON.stringify(usuarios));

    localStorage.setItem('Ingresado','true');
    this.navCtrl.navigateRoot('home');

  }

}
