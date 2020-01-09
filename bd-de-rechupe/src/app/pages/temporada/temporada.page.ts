import { Component, OnInit } from '@angular/core';
import { Ingrediente } from 'src/app/ingrediente.model';
import { ItemService } from 'src/app/item.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Receta } from 'src/app/receta.model';
import { ModalCheckPage } from '../modal-check/modal-check.page';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-temporada',
  templateUrl: './temporada.page.html',
  styleUrls: ['./temporada.page.scss'],
})
export class TemporadaPage implements OnInit {
  ingredientes: Ingrediente[];
  recetas: Receta[] = [];

  rctsings: any[] = [];
  temporadas: any[] = [];
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

  textoBuscar = '';
  all = false;

  constructor(
    private itemService: ItemService,
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
  // Función que carga la lista de materiales externos
  ionViewDidEnter() {
    const iduser = this.authService.getUserId();
    if (iduser) {
    console.log('UserID: ' + iduser);
    this.itemService.getAllRecetas(iduser).subscribe((res) => {
    this.recetas = res.data;
    });
    this.itemService.getAllIngredientes(iduser).subscribe((res) => {
    this.ingredientes = res.data;
    });
    this.itemService.getRecetasIngredientes(iduser).subscribe((res) => { // Obtener recetas_ingredientes
    this.rctsings = res.data;
    });
    this.itemService.getIngredientesTemporadas(iduser).subscribe((res) => { // Obtener ingredientes_temporadas
    this.temporadas = res.data;
    });
    }
  }
  // Función que obtiene el texto introducido en la barra de búsqueda
  search( event ) {
    this.textoBuscar = event.detail.value;
  }

  // Función que llama el modal para seleccionar los meses
  async onSeleccionarmeses() {
    const modal = await this.modalCtrl.create({
      component: ModalCheckPage,
      componentProps: { // Pasar datos
        array: this.meses,
        titulomodal: 'Seleccionar los meses:',
        botonmodal: 'Elegir meses',
        mensajealert: '¿Deseas elegir estos meses?',
        confirmalert: 'Aceptar',
        activarboton: true
      }
      });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.meses = data.respuesta;
    console.log('MESES NUEVO:', this.meses);
  }


}
