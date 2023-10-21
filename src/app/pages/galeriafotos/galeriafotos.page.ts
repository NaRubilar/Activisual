import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';


@Component({
  selector: 'app-galeriafotos',
  templateUrl: './galeriafotos.page.html',
  styleUrls: ['./galeriafotos.page.scss'],
})
export class GaleriafotosPage implements OnInit {
  fotoUrl: string | null;

  constructor(
    private firestore: FirestoreService,
    private route: ActivatedRoute) {
      this.fotoUrl = this.route.snapshot.paramMap.get('fotoUrl');

    }



  ngOnInit() {
  }



}
