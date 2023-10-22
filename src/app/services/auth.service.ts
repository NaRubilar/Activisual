import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, getAuth, signInWithPopup, } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }


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


}
