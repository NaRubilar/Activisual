import { Component, OnInit } from '@angular/core';

import { PageOneComponent } from './page-one.component';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {
  component = PageOneComponent;

  constructor() { }

  ngOnInit() {
  }

}
