import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal-check',
  templateUrl: './modal-check.page.html',
  styleUrls: ['./modal-check.page.scss'],
})
export class ModalCheckPage implements OnInit {

  @Input() array; // Recibe datos
  @Input() titulomodal;
  @Input() botonmodal;
  @Input() activarboton;
  @Input() mensajealert;
  @Input() confirmalert;

  clonearray: any[] = [];

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
    this.clonearray = JSON.parse(JSON.stringify(this.array)); // clonar arreglo
  }

  // Función que muestra un alert, cierra el modal y pasa la respuesta modificada.
  onconfirmarCambios() {
    this.alertCtrl.create({
        header: '¿Estás seguro?',
        message: this.mensajealert,
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: this.confirmalert,
          handler: () => {
            this.modalCtrl.dismiss({  // Cerrar modal y pasar datos de respuesta
              respuesta: this.clonearray
            });
          }
        }]
    }).then(alertElem => {
        alertElem.present();
    });
  }

  // Función que cierra el modal
  salir() {
    this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Quieres cerrar la ventana?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Cerrar',
        handler: () => {
          this.modalCtrl.dismiss({  // Cerrar modal y pasar datos originales
            respuesta: this.array
          });
        }
      }]
  }).then(alertElem => {
      alertElem.present();
  });
  }

  onTodos() {
    const res = this.clonearray.every(elem => { // Ayuda a confirmar si todos están seleccionados
      return elem.selected === true;
    });
    if (res) { // Hay que deseleccionarlos
      this.clonearray.forEach(elem => {
        elem.selected = false;
      });
    } else { // Hay que seleccionarlos
      this.clonearray.forEach(elem => {
        elem.selected = true;
      });
    }
  }


}
