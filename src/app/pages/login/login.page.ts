import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
              private alertController: AlertController,
              public navCtrl: NavController) {

    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)

    })

  }

  ngOnInit() {
  }


  async ingresar(){
    var f = this.formularioLogin.value;

    var usuarios = JSON.parse(localStorage.getItem('usuarios')!);

    if(usuarios.usuario == f.usuario && usuarios.password == f.password){
      console.log('Ingresado');
      localStorage.setItem('Ingresado','true');
      this.navCtrl.navigateRoot('home');
    }else{
      const alert = await this.alertController.create({
        message: 'Los datos ingresados no son correctos',
        buttons: ['Aceptar']
      });

      await alert.present();
    }



  }

}

