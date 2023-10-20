import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-restablecerpassword',
  templateUrl: './restablecerpassword.page.html',
  styleUrls: ['./restablecerpassword.page.scss'],
})
export class RestablecerpasswordPage implements OnInit {
  correo:any
  constructor(private authService:AuthService,
              public navCtrl: NavController) { }

  ngOnInit() {
  }

  // Método para enviar un correo electrónico de restablecimiento de contraseña
  resetPassword() {
    this.authService.resetPassword(this.correo)
      .then(() => {
        console.log('Correo electrónico de restablecimiento de contraseña enviado.');
        this.navCtrl.navigateRoot('home');
        // Puedes redirigir al usuario a otra página o mostrar un mensaje de éxito aquí
      })
      .catch(error => {
        console.error(error);
        // Maneja los errores, como correo electrónico no válido, aquí
      });
  }

}
