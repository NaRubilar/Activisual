import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Usuarios } from 'src/app/models/models';


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
              private authFirebase: AngularFireAuth,
              private authService: AuthService) {

    this.formularioLogin = this.fb.group({
      'correo': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)

    })

  }

  ngOnInit() {
  }


  async ingresar() {

    var f = this.formularioLogin.value;

    const usuarios: Usuarios = {
      usuario: f.usuario,
      correo: f.correo,
      password: f.password,
      repetirPassword: f.repetirPassword
    }

    const credenciales = {
      correo: f.correo,
      password: f.password,
    };

    var id = this.firestore.getId();

    const Usuarios = this.firestore.getDoc('Usuarios', id);
    if(credenciales.correo === usuarios.correo && credenciales.password === usuarios.password){
      console.log('Ingresado');
      localStorage.setItem('Ingresado','true');
      this.navCtrl.navigateRoot('home');
    }



 }
}

