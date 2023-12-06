import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, getAuth, signInWithPopup, } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private apiUrl = 'https://api.emailjs.com/api/v1.0/email/send-form';

  constructor(private auth: AngularFireAuth) { }


  app = initializeApp(environment.firebaseConfig);
  login(correo: string, password: string){
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logout(){
    return this.auth.signOut();
  }

  registrar(correo: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(correo, password);
  }


  resetPassword(correo: string): Promise<void> {
    return this.auth.sendPasswordResetEmail(correo);
  }

  async getProfile() {
    return await this.auth.currentUser
  }

  getUser() {
    return this.auth.authState;
  }

  sendEmail(formData: FormData): Promise<Response> {
    return fetch(this.apiUrl, {
      method: 'POST',
      body: formData,
    });
  }


}
