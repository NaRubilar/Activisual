import { Component, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mostrar-imagen-modal',
  templateUrl: './mostrar-imagen-modal.component.html',
  styleUrls: ['./mostrar-imagen-modal.component.scss'],
})
export class MostrarImagenModalComponent{

  @Input() imagen: string;
  constructor(private modalController: ModalController) { }

  cerrarModal() {
    this.modalController.dismiss();
  }
}

