import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalCheckPage } from '../modal-check/modal-check.page';

@Component({
  selector: 'app-crear-ing',
  templateUrl: './crear-ing.page.html',
  styleUrls: ['./crear-ing.page.scss'],
})
export class CrearIngPage implements OnInit {
  meses = [
    {
      nombre: 'Enero',
      selected: false
    },
    {
      nombre: 'Febrero',
      selected: false
    },
    {
      nombre: 'Marzo',
      selected: false
    },
    {
      nombre: 'Abril',
      selected: false
    },
    {
      nombre: 'Mayo',
      selected: false
    },
    {
      nombre: 'Junio',
      selected: false
    },
    {
      nombre: 'Julio',
      selected: false
    },
    {
      nombre: 'Agosto',
      selected: false
    },
    {
      nombre: 'Septiembre',
      selected: false
    },
    {
      nombre: 'Octubre',
      selected: false
    },
    {
      nombre: 'Noviembre',
      selected: false
    },
    {
      nombre: 'Diciembre',
      selected: false
    }
  ];

  constructor(
    private itemService: ItemService,
    public toastController: ToastController,
    private router: Router,
    private alertCtrl: AlertController,
    private  authService: AuthService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.authService.getKeyValue('userId').then((iduser) => {
      if (iduser) {
        this.authService.setUserId(iduser);
      }
    });
  }

  // Función auxiliar. Crea el toast y lo muestra (con el mensaje recibido a través del input)
  async onToast(msj: string, dur: number) {
    const toast = await this.toastController.create({
      message: msj,
      duration: dur
    });
    toast.present();
  }

  // Función que crea el ingrediente y luego redirecciona a la página anterior
  OnCrearIngrediente(form) {
    const pesoref = Number(form.value.peso);
    const proteina = Number(form.value.proteina);
    const grasa = Number(form.value.grasa);
    const carbohidratos = Number(form.value.carbohidratos);
    const fibra = Number(form.value.fibra);
    const colesterol = Number(form.value.colesterol) / 1000;
    const sodio = Number(form.value.sodio) / 1000;
    const suma = Number(proteina + grasa + carbohidratos + colesterol + sodio);
    if (fibra > carbohidratos) {
      console.log('Fibra: ', fibra);
      console.log('Carbohibratos: ', carbohidratos);
      this.onToast('La fibra debe ser menor o igual a los carbohidratos totales', 2750); // Desplegar mensaje de error
      return;
    }
    if (pesoref < suma) {
      console.log('Pesoref: ', pesoref);
      console.log('Suma: ', suma);
      this.onToast('La suma total en gramos debe ser menor o igual al peso de referencia', 2750); // Desplegar mensaje de error
      return;
    }
    // Los datos de los inputs son correctos
    const sinelegirmes = this.meses.every((elem) => {
      return elem.selected === false;
    });
    let headermsj = '¿Estás seguro?';
    let msj = '¿Deseas crear el ingrediente?';
    if (sinelegirmes) {
      headermsj = '¡No hay meses seleccionados!';
      msj = '¿Deseas crear el ingrediente de todas formas?';
    }
    this.alertCtrl.create({
      header: headermsj,
      message: msj,
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Crear',
        handler: () => {
          const iduser = this.authService.getUserId();
          if (iduser) {
            const obj = {
              form: form.value,
              id: iduser
            };
            const obj2 = {
              array: [],
              idingrediente: null,
              id: null
            };
            console.log('Objeto', obj);
            this.itemService.crearIngrediente(obj).subscribe((res) => {
              if (res.data && res.data !== -1) { // Si existe
                obj2.array = this.meses;
                obj2.idingrediente = res.data['last_insert_rowid()'];
                obj2.id = iduser;
                console.log('Objeto2', obj2);
                this.itemService.insertarTemporadasIngrediente(obj2).subscribe((elem) => {
                  if (elem.data) { // Si existe
                    form.reset(); // Limpiar formulario
                    this.onToast('Operación exitosa!', 2000); // Desplegar mensaje de éxito
                    this.router.navigate(['/mainmenu']); // Redireccionar a la página anterior
                  }
                });
              }
            });
          }

        }
      }]
    }).then(alertElem => {
      alertElem.present();
    });


  }
  // Función que llama el modal para seleccionar los meses
  async onSeleccionarmeses() {
    const modal = await this.modalCtrl.create({
      component: ModalCheckPage,
      componentProps: { // Pasar datos
        array: this.meses,
        titulomodal: 'Elegir la disponibilidad:',
        botonmodal: 'Asignar meses',
        mensajealert: '¿Deseas asignar estos meses?',
        confirmalert: 'Asignar',
        activarboton: true
      }
      });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.meses = data.respuesta;
    console.log('MESES NUEVO:', this.meses);
  }


}
