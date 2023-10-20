import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


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
              private loadingController: LoadingController) {

    this.formularioReg = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'correo': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'repetirPassword': new FormControl("",Validators.required)

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

        if (user) {
          loading.dismiss();
          console.log("Usuario Creado")
          this.navCtrl.navigateRoot('home');
        }
      } else {
        await loading.dismiss();
        return console.log('Porfavor, Ingrese los datos correctamente');
      }
    }




}
