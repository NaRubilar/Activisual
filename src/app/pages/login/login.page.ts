import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';


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
              private toastController: ToastController,
              public formBuilder: FormBuilder,
              public alertController: AlertController) {

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
      const alert = await this.alertController.create({
        header: 'Datos sin ingresar',
        message: 'Porfavor, Ingrese los datos correspondientes',
        buttons: ['OK']
      });
      await alert.present();

      return console.log('Porfavor, Ingrese los datos correspondientes');
    }

    }
    get errorControl() {
      return this.formularioLogin.controls;
    }

    async presentToast(message: undefined) {
      console.log(message);

      const toast = await this.alertController.create({
        header: '',
        message: 'Los datos que ingreso no son los correctos',
        buttons: ['Volver a intentar']
      });

      await toast.present();
    }


}


