import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ActivatedRoute } from '@angular/router';


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
