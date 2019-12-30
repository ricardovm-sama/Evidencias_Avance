import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  @Input() obj; // Recibe datos
  @Input() titulomodal;

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {
  }

  // Función que cierra el modal
  salir() {
    this.modalCtrl.dismiss();
  }

}
