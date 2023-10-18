import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Usuarios } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
              private alertController: AlertController,
              public navCtrl: NavController,
              private firestore: FirestoreService,
              private firestoreAuth: AngularFireAuthModule) {

    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)

    })

  }

  ngOnInit() {
  }

  /*
  ingresar() {
    const credenciales = {
      email: this.cliente.email,
      password: this.cliente.celular,
    };
    this.firebaseauthService.login(credenciales.email, credenciales.password).then( res => {
         console.log('ingreso con exito');
    });
 }


  async ingresar(){
    var f = this.formularioLogin.value;

    //comentario//
    const user: Usuarios = {
    usuario: "",
    correo: "",
    password: "",
    repetirPassword: ""
    }
    

    
    let usuarios:  Usuarios []= []
    usuarios = this.firestore.getCollection('Usuarios')

    if(this.usuarios.usuario == f.usuario && usuarios.password == f.password){
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



  }*/

}

