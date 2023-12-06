import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  userProfileImage = 'assets/img/profile.jpg';
  userName = 'Nombre de Usuario';
  userEmail = 'correo@ejemplo.com';
  userDescription = '';
  likeCount = 10;  // Reemplaza con tu lógica real
  uploadedPhotoCount = 5;  // Reemplaza con tu lógica real
  editingDescription = false;
  editedDescription = '';

  constructor() { }

  ngOnInit() {
  }

  editProfilePicture() {
    // Lógica para editar la foto de perfil
  }


  editDescription() {
    this.editingDescription = true;
    this.editedDescription = this.userDescription;
  }

  saveDescription() {
    this.userDescription = this.editedDescription;
    this.editingDescription = false;
  }

}
