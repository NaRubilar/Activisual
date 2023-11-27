import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { FotoService } from '../../services/foto.service';


@Component({
  selector: 'app-galeriafotos',
  templateUrl: './galeriafotos.page.html',
  styleUrls: ['./galeriafotos.page.scss'],
})
export class GaleriafotosPage implements OnInit {
  fotoUrl: string | null;
  photos: String[] = [];

  constructor(
    private firestore: FirestoreService,
    private route: ActivatedRoute,
    private fotoService :FotoService ) {


    }



  ngOnInit() {
     const photos = this.fotoService.getFotos(); // Llama a la función para cargar las fotos al inicializar la página

    // Escucha el evento de foto guardada para actualizar la galería
    this.fotoService.fotoGuardada.subscribe((dataUrl: string) => {
      this.photos.unshift(dataUrl); // Agrega la nueva foto al principio de la lista
    });
  }

  // Muestra la foto en la galería
  showFoto(photo: string) {
    // Asigna la foto al elemento ion-img
    const img = document.querySelector('ion-img');
    img.src = photo;
  }


}
