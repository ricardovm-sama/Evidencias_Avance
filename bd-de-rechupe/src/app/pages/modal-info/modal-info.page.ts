import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  @Input() obj; // Recibe datos
  @Input() titulomodal;
  @Input() activarboton;

  constructor(
     private modalCtrl: ModalController,
     private alertCtrl: AlertController
     ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.activarboton) { // Mostrar botón
      document.getElementById('zonaboton').style.display = 'inline';
    }
    console.log('Activarboton', this.activarboton);
  }

  // Función que muestra un alert, cierra el modal y pasa la respuesta.
  onconfirmarCambios() {
    this.alertCtrl.create({
        header: '¿Estás seguro?',
        message: '¿Deseas hacer estos cambios al inventario?',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Modificar',
          handler: () => {
            this.modalCtrl.dismiss({  // Cerrar modal y pasar datos de respuesta
              respuesta: true
            });
          }
        }]
    }).then(alertElem => {
        alertElem.present();
    });
  }

  // Función que cierra el modal
    salir() {
      this.modalCtrl.dismiss();
    }

}
