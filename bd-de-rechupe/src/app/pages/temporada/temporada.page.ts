import { Component, OnInit } from '@angular/core';
import { Ingrediente } from 'src/app/ingrediente.model';
import { ItemService } from 'src/app/item.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Receta } from 'src/app/receta.model';


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
  meses: any[] = [];

  textoBuscar = '';
  all = false;

  constructor(
    private itemService: ItemService,
    private  authService: AuthService
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
//    this.meses.push('Febrero');
//    this.meses.push('Marzo');
/*    console.log('Recetas', this.recetas);
    console.log('Ingredientes', this.ingredientes);
    console.log('Recetas_Ingredientes', this.rctsings);
    console.log('Temporadas', this.temporadas); */
    console.log('MESES', this.meses);
    }
  }
  // Función que obtiene el texto introducido en la barra de búsqueda
  search( event ) {
    this.textoBuscar = event.detail.value;
  }
  // Función que actualiza el arreglo meses con los meses seleccionados.
  obtenerMeses(multiselect: any) {
    this.meses = multiselect.value;
  }
  // Función que selecciona/deselecciona todos los meses OPCIONAL
  onTodos(multiselect: any, option: any) {
/*    if (option.name === 'ninguno') {
      console.log('hola');
      this.all = true;
      option.name = 'todos';
    }*/
    if (option.value === 'ninguno') {
      console.log('hola');
      this.all = true;
      option.value = 'todos';
      return true;
    }
    if (option.value === 'todos') {
      console.log('wei');
      this.all = false;
      option.value = 'ninguno';
      return false;
    }

  }


}
