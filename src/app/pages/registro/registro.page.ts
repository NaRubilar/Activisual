import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioReg: FormGroup;

  constructor(public fb: FormBuilder,
              public navCtrl: NavController,
              private authService: AuthService,
              private loadingController: LoadingController,
              public alertController: AlertController) {

    this.formularioReg = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'correo': new FormControl("",Validators.email),
      'password': new FormControl("",Validators.minLength(6)),
      'repetirPassword': new FormControl("",Validators.minLength(6))

    });
  }

  async ngOnInit() {}

  async guardar(){
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.formularioReg.valid) {

      const user = await this.authService.registrar(this.formularioReg.value.correo, this.formularioReg.value.password).catch((err) => {
        console.log(err);
        loading.dismiss();
      })
      
      if (this.formularioReg.controls['password'].value != this.formularioReg.controls['repetirPassword'].value){
          const alert = await this.alertController.create({
            header: 'Contraseñas no coinciden',
            message: 'Porfavor, Ingrese las mismas contraseñas',
            buttons: ['OK']
        })
        await loading.dismiss();
        await alert.present();
        this.navCtrl.navigateRoot('registro')
        
      }else if(user) {
        loading.dismiss();
        console.log("Usuario Creado")
        this.navCtrl.navigateRoot('home');
      }
    } else {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Porfavor, Ingrese todos los datos correspondientes!!!',
        buttons: ['OK']
      });
      await alert.present();
      return console.log('Porfavor, Ingrese los datos correctamente');
    }
  }







}
