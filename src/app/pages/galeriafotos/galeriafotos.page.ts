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
  photos: any;
  constructor(
    private firestore: FirestoreService,
    private route: ActivatedRoute,
    public fotoService :FotoService ) {
    }

  ngOnInit() {
  }



}
