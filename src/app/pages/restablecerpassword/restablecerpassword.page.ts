import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-restablecerpassword',
  templateUrl: './restablecerpassword.page.html',
  styleUrls: ['./restablecerpassword.page.scss'],
})
export class RestablecerpasswordPage implements OnInit {
  correo:any
  constructor(private authService: AuthService,
              public navCtrl: NavController,
              public alertController: AlertController) { }

  ngOnInit() {
  }

  // Método para enviar un correo electrónico de restablecimiento de contraseña
  async resetPassword() {
    this.authService.resetPassword(this.correo)
      .then(() => {
        console.log('Correo electrónico de restablecimiento de contraseña enviado.');
        this.navCtrl.navigateRoot('home');
        // Puedes redirigir al usuario a otra página o mostrar un mensaje de éxito aquí
      })
      .catch(async error => {
        console.log(error);
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Porfavor, Ingrese todos los datos correspondientes!!!',
          buttons: ['OK']
        });
        await alert.present();
        return console.log('Porfavor, Ingrese los datos correctamente');
        // Maneja los errores, como correo electrónico no válido, aquí
      });
  }

}
