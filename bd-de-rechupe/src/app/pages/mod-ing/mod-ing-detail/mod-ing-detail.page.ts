import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../../item.service';
import { Ingrediente } from 'src/app/ingrediente.model';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { ModalCheckPage } from '../../modal-check/modal-check.page';

@Component({
  selector: 'app-mod-ing-detail',
  templateUrl: './mod-ing-detail.page.html',
  styleUrls: ['./mod-ing-detail.page.scss'],
})
export class ModIngDetailPage implements OnInit {
  temporadas: any[] = [];

  loadedIngrediente: Ingrediente = {
    id: 0,
    iduser: 0,
    nombre: '',
    precio: 0,
    peso: 0.00,
    peso_disp: 0.00,
    energia: 0.00,
    proteina: 0.00,
    grasa: 0.00,
    carbohidratos: 0.00,
    fibra: 0.00,
    colesterol: 0.00,
    sodio: 0.00
  };

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
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    public toastController: ToastController,
    private router: Router,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {

  }

  // Función que carga la lista de ingredientes
  ionViewWillEnter() {
    console.log('DETALLES DEL INGREDIENTE');
    let ingredienteId = '';
    this.activatedRoute.paramMap.subscribe(paramMap => { // Obtener información de la ruta activada (segmento url dinámico).
      if (!paramMap.has('ingredienteId')) {
        this.router.navigate(['/mod-ing']); // Redireccionar a la página anterior
      }
      ingredienteId = paramMap.get('ingredienteId'); // Asignar el objeto correspondiente del id del url
    });

    this.itemService.getIngrediente(Number(ingredienteId)).subscribe((res) => {
      if (res) {
        this.loadedIngrediente = res.data;
        console.log('Ingrediente cargado', this.loadedIngrediente);
        this.itemService.getIngredienteTemporadas(this.loadedIngrediente.id).subscribe((tempelem) => {
          if (tempelem) {
            this.temporadas = tempelem.data;
            console.log('temporadas', this.temporadas);
            const mesesnom = this.temporadas.map(elem => elem.temp); // Obtener arreglo de sólo los nombres de los meses seleccionados
            this.meses.forEach((elem) => { // Actualizar el arreglo de meses con información de la bd
              mesesnom.forEach((mesnom) => {
                if (elem.nombre === mesnom) {
                  elem.selected = true;
                }
              });
            });
          }
        });
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

  // Función que modifica un ingrediente y luego redirecciona a la página anterior
  OnModicarIngrediente(form) {
    let pesoref = Number(form.value.peso);
    let proteina = Number(form.value.proteina);
    let grasa = Number(form.value.grasa);
    let carbohidratos = Number(form.value.carbohidratos);
    let fibra = Number(form.value.fibra);
    let colesterol = Number(form.value.colesterol) / 1000;
    let sodio = Number(form.value.sodio) / 1000;
    if (form.value.peso === '') {
      pesoref = this.loadedIngrediente.peso;
    }
    if (form.value.proteina === '') {
      proteina = this.loadedIngrediente.proteina;
    }
    if (form.value.grasa === '') {
      grasa = this.loadedIngrediente.grasa;
    }
    if (form.value.carbohidratos === '') {
      carbohidratos = this.loadedIngrediente.carbohidratos;
    }
    if (form.value.fibra === '') {
      fibra = this.loadedIngrediente.fibra;
    }
    if (form.value.colesterol === '') {
      colesterol = this.loadedIngrediente.colesterol;
    }
    if (form.value.sodio === '') {
      sodio = this.loadedIngrediente.sodio;
    }
    const suma = Number(proteina + grasa + carbohidratos + fibra + colesterol + sodio);
    if (pesoref < suma) {
      console.log('Pesoref: ', pesoref);
      console.log('Suma: ', suma);
      this.onToast('La suma en gramos debe ser menor o igual al peso de referencia', 2750); // Desplegar mensaje de error
      return;
    }
    // Los datos de los inputs son correctos
    this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Deseas modificar el ingrediente?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Modificar',
        handler: () => {
            const obj2 = {
              array: this.meses,
              idingrediente: this.loadedIngrediente.id,
              id: this.loadedIngrediente.iduser
            };
            console.log('Objeto2', obj2);
            const cloneObject = Object.assign({}, this.loadedIngrediente);
            this.itemService.modicarIngrediente(cloneObject, form.value).subscribe((res) => {
              if (res.data) { // Si existe
                this.itemService.eliminarTemporadasIngrediente(this.loadedIngrediente.id).subscribe((res2) => {
                  if (res2.data) { // Si existe
                    console.log('ID ingrediente obtenido', res2.data);
                    this.itemService.insertarTemporadasIngrediente(obj2).subscribe((elem) => {
                      if (elem.data) { // Si existe
                        this.onToast('Operación exitosa!', 2000); // Desplegar mensaje de éxito
                        this.router.navigate(['/mainmenu']); // Redireccionar a la página anterior
                      }
                    });
                  }
                });
              }
            });
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
/*    idingrediente integer NOT NULL,
    iduser integer NOT NULL,
    temp text NOT NULL,*/
}
