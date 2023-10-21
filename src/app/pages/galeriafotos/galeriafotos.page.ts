import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-galeriafotos',
  templateUrl: './galeriafotos.page.html',
  styleUrls: ['./galeriafotos.page.scss'],
})
export class GaleriafotosPage implements OnInit {

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {
  }

}
