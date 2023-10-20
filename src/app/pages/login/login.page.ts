import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
              public navCtrl: NavController,
              private authService: AuthService,
              private loadingController: LoadingController,
              private toastController: ToastController) {

    this.formularioLogin = this.fb.group({
      'correo': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)

    })

  }

  ngOnInit() {
  }


  async ingresar() {
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.formularioLogin.valid) {

      const user = await this.authService.login(this.formularioLogin.value.correo, this.formularioLogin.value.password).catch((err) => {
        this.presentToast(err)
        console.log(err);
        loading.dismiss();
      })

      if (user) {
        loading.dismiss();
        console.log('Ingresado');
        localStorage.setItem('Ingresado','true');
        this.navCtrl.navigateRoot('home');
      }
    } else {
      loading.dismiss();
      return console.log('Porfavor, Ingrese los datos correspondientes');
    }

    }
    get errorControl() {
      return this.formularioLogin.controls;
    }

    async presentToast(message: undefined) {
      console.log(message);

      const toast = await this.toastController.create({
        message: message,
        duration: 1500,
        position: 'top',
      });

      await toast.present();
    }


}


