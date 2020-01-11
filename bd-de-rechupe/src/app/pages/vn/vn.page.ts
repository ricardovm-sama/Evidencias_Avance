import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Ingrediente } from 'src/app/ingrediente.model';
import { Receta } from 'src/app/receta.model';
import { Cantidad } from 'src/app/cantidad.model';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vn',
  templateUrl: './vn.page.html',
  styleUrls: ['./vn.page.scss'],
})
export class VnPage implements OnInit {
  ingredientes: Ingrediente[] = [];
  recetas: Receta[] = [];

  rctsrcts: any[] = [];
  rctsings: any[] = [];

  rctvalores: Cantidad[] = [];
  ingvalores: Cantidad[] = [];
  textoBuscar = '';

  cifras = 3;

  constructor(
    private itemService: ItemService,
    private  authService: AuthService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.authService.getKeyValue('userId').then((iduser) => {
      if (iduser) {
        this.authService.setUserId(iduser);
        this.rctvalores.length = 0;
        this.ingvalores.length = 0;
      }
    });
  }

  // Función que carga la lista de materiales externos
  ionViewDidEnter() {
    const iduser = this.authService.getUserId();
    if (iduser) {
      console.log('UserID: ' + iduser);
      this.itemService.getAllIngredientes(iduser).subscribe((res) => { // Obtener ingredientes
      this.ingredientes = res.data;
      });
      this.itemService.getAllRecetas(iduser).subscribe((res) => { // Obtener recetas
      this.recetas = res.data;
      });
      this.itemService.getRecetasRecetas(iduser).subscribe((res) => { // Obtener recetas_recetas
      this.rctsrcts = res.data;
      });
      this.itemService.getRecetasIngredientes(iduser).subscribe((res) => { // Obtener recetas_ingredientes
      this.rctsings = res.data;
      });
    }
  }
// Función que obtiene un ítem usando su id de ítem (en distintos arreglos dependiendo del tipo del ítem)
getObjetoById(id: number, tipo: number) {
  switch (tipo) {
    case 1:
      return this.rctvalores.filter( item => {
        if (item) {
          return item.iditem === id;
        }
        return null;
      });
    case 2:
      return this.ingvalores.filter( item => {
        if (item) {
          return item.iditem === id;
        }
        return null;
      });
    }
}
// Función que borra un ítem (en distintos arreglos dependiendo del tipo del ítem)
borrarElementosContenidos(id: number, tipo: number) {
  let valores: Cantidad[] = [];
  valores = this.getObjetoById(id, tipo);

  if (typeof(valores) !== 'undefined' && valores.length > 0) { // La entrada del input ya se había guardado.
    console.log('Se remueve la entrada del arreglo');
    switch (tipo) {
    case 1:
      this.rctvalores = this.rctvalores.filter( item => { // Se remueve el elemento del array
        return valores.indexOf( item ) < 0;
    });
      console.log('Largo Arreglo: ' + this.rctvalores.length);
      break;
    case 2:
      this.ingvalores = this.ingvalores.filter( item => { // Se remueve el elemento del array
        return valores.indexOf( item ) < 0;
    });
      console.log('Largo Arreglo: ' + this.ingvalores.length);
      break;
    }
  }
  return;
}
  // Función que va guardando los inputs del usuario (en distintos arreglos dependiendo del tipo del ítem)
  addValue(tipo: number, entry: any, iditems: number) {
    const valor = entry.value;
    const patternPeso = new RegExp('^(([1-9]{1}[0-9]{0,})|([0]{1}))([.]{1}[0-9]{1,})?$');

    if ((valor === '' || Number(valor) === 0) || (valor !== '' && !patternPeso.test(valor))) {
      this.borrarElementosContenidos(iditems, tipo);
      entry.value = ''; // Restablecer el placeholder
      entry.placeholder = '0.00';
      return;
    }

    let valores: Cantidad[] = [];
    valores = this.getObjetoById(iditems, tipo);

    if (typeof(valores) !== 'undefined' && valores.length > 0) { // La entrada del input ya se había guardado.
       console.log('Ya se había guardado el valor del input');
       valores[0].cantidad = Number(valor);
       console.log('IDItem: ' + valores[0].iditem + ', Valor asignado: ' + valores[0].cantidad);
    } else { // Sino, la entrada del input se guarda por primera vez con push
      const item: Cantidad = {
        iditem: iditems,
        cantidad: Number(valor)
      };
      switch (tipo) { // Si son recetas o ingredientes
        case 1:
            this.rctvalores.push(item);
            console.log('IDItem: ' + this.rctvalores[this.rctvalores.length - 1].iditem + ', Valor asignado: '
            + this.rctvalores[this.rctvalores.length - 1].cantidad);
            console.log('Largo Arreglo: ' + this.rctvalores.length);
            break;
        case 2:
            this.ingvalores.push(item);
            console.log('IDItem: ' + this.ingvalores[this.ingvalores.length - 1].iditem + ', Valor asignado: '
            + this.ingvalores[this.ingvalores.length - 1].cantidad);
            console.log('Largo Arreglo: ' + this.ingvalores.length);
            break;
      }
    }
  }

  // Función que retorna una suma del valor nutricional (para ingredientes)
  vnIngredientes(item: Cantidad, suma: any, ing: any) {
    let energia = 0;
    let proteina = 0;
    let grasa = 0;
    let carbohidratos = 0;
    let fibra = 0;
    let colesterol = 0;
    let sodio = 0;

    energia = Number(((item.cantidad * ing.energia) / 100).toFixed(this.cifras));
    proteina = Number(((item.cantidad * ing.proteina) / 100).toFixed(this.cifras));
    grasa = Number(((item.cantidad * ing.grasa) / 100).toFixed(this.cifras));
    carbohidratos = Number(((item.cantidad * ing.carbohidratos) / 100).toFixed(this.cifras));
    fibra = Number(((item.cantidad * ing.fibra) / 100).toFixed(this.cifras));
    colesterol = Number((((item.cantidad * (ing.colesterol / 1000)) / 100) * 1000).toFixed(this.cifras));
    sodio = Number((((item.cantidad * (ing.sodio / 1000)) / 100) * 1000).toFixed(this.cifras));

    suma.energia = Number((suma.energia + energia).toFixed(this.cifras));
    suma.proteina = Number((suma.proteina + proteina).toFixed(this.cifras));
    suma.grasa = Number((suma.grasa + grasa).toFixed(this.cifras));
    suma.carbohidratos = Number((suma.carbohidratos + carbohidratos).toFixed(this.cifras));
    suma.fibra = Number((suma.fibra + fibra).toFixed(this.cifras));
    suma.colesterol = Number((suma.colesterol + colesterol).toFixed(this.cifras));
    suma.sodio = Number((suma.sodio + sodio).toFixed(this.cifras));
    console.log('------------------INGREDIENTES---------------------------------------');
    console.log('Ingrediente: ' + ing.nombre + ', Energia: ' + energia);
    console.log('Ingrediente: ' + ing.nombre + ', Proteina: ' + proteina);
    console.log('Ingrediente: ' + ing.nombre + ', Grasa: ' + grasa);
    console.log('Ingrediente: ' + ing.nombre + ', Carbohidratos: ' + carbohidratos);
    console.log('Ingrediente: ' + ing.nombre + ', Fibra: ' + fibra);
    console.log('Ingrediente: ' + ing.nombre + ', Colesterol: ' + colesterol);
    console.log('Ingrediente: ' + ing.nombre + ', Sodio: ' + sodio);
    console.log('---------------------------------------------------------');
    return suma;
  }

  // Función recursiva que calcula el valor nutricional total de 1 receta
  vnReceta(iduser: number, item: Cantidad, recetaId: number, suma: any) {
    this.rctsings.forEach((rctitem) => { // Para cada ingrediente asociado
      if (rctitem.idreceta === recetaId) {
        this.ingredientes.forEach( ing => {
          if (rctitem.idingrediente === ing.id) { // Buscar ingredientes que coinciden con los del usuario
              const energia = Number(((item.cantidad * rctitem.peso * ing.energia) / 100).toFixed(this.cifras));
              const proteina = Number(((item.cantidad * rctitem.peso * ing.proteina) / 100).toFixed(this.cifras));
              const grasa = Number(((item.cantidad * rctitem.peso * ing.grasa) / 100).toFixed(this.cifras));
              const carbohidratos = Number(((item.cantidad * rctitem.peso * ing.carbohidratos) / 100).toFixed(this.cifras));
              const fibra = Number(((item.cantidad * rctitem.peso * ing.fibra) / 100).toFixed(this.cifras));
              const colesterol = Number((((item.cantidad * rctitem.peso * (ing.colesterol / 1000)) / 100) * 1000).toFixed(this.cifras));
              const sodio = Number((((item.cantidad * rctitem.peso * (ing.sodio / 1000)) / 100) * 1000).toFixed(this.cifras));

              suma.energia = Number((suma.energia + energia).toFixed(this.cifras));
              suma.proteina = Number((suma.proteina + proteina).toFixed(this.cifras));
              suma.grasa = Number((suma.grasa + grasa).toFixed(this.cifras));
              suma.carbohidratos = Number((suma.carbohidratos + carbohidratos).toFixed(this.cifras));
              suma.fibra = Number((suma.fibra + fibra).toFixed(this.cifras));
              suma.colesterol = Number((suma.colesterol + colesterol).toFixed(this.cifras));
              suma.sodio = Number((suma.sodio + sodio).toFixed(this.cifras));
              console.log('------------------PARA CADA INGREDIENTE RELACIONADO---------------------------------------');
              console.log('Ingrediente: ' + ing.nombre + ', Energia: ' + suma.energia);
              console.log('Ingrediente: ' + ing.nombre + ', Proteina: ' + suma.proteina);
              console.log('Ingrediente: ' + ing.nombre + ', Grasa: ' + suma.grasa);
              console.log('Ingrediente: ' + ing.nombre + ', Carbohidratos: ' + suma.carbohidratos);
              console.log('Ingrediente: ' + ing.nombre + ', Fibra: ' + suma.fibra);
              console.log('Ingrediente: ' + ing.nombre + ', Colesterol: ' + suma.colesterol);
              console.log('Ingrediente: ' + ing.nombre + ', Sodio: ' + suma.sodio);
              console.log('---------------------------------------------------------');
          }
        });
      }
    });
    this.rctsrcts.forEach((rctitem) => { // Para cada receta asociada
      if (rctitem.idreceta === recetaId) {
        this.recetas.forEach( rct => {
          if (rctitem.idreceta === rct.id) { // Buscar recetas que coinciden con las del usuario
            const cloneitem = Object.assign({}, item); // clonar objetos antes de pasarlos a una función
            cloneitem.cantidad = Number((item.cantidad * rctitem.cantidad).toFixed(this.cifras));
            const nuevasuma = {
            energia: 0,
            proteina: 0,
            grasa: 0,
            carbohidratos: 0,
            fibra: 0,
            colesterol: 0,
            sodio: 0
            };

            const res = this.vnReceta(iduser, cloneitem, rctitem.idsubreceta, nuevasuma); // Llamada recursiva para las subrecetas

            suma.energia = Number((suma.energia + res.energia).toFixed(this.cifras));
            suma.proteina = Number((suma.proteina + res.proteina).toFixed(this.cifras));
            suma.grasa = Number((suma.grasa + res.grasa).toFixed(this.cifras));
            suma.carbohidratos = Number((suma.carbohidratos + res.carbohidratos).toFixed(this.cifras));
            suma.fibra = Number((suma.fibra + res.fibra).toFixed(this.cifras));
            suma.colesterol = Number((suma.colesterol + res.colesterol).toFixed(this.cifras));
            suma.sodio = Number((suma.sodio + res.sodio).toFixed(this.cifras));
            console.log('------------------ACUMULADO---------------------------------------');
            console.log('Energia: ' + suma.energia);
            console.log('Proteina: ' + suma.proteina);
            console.log('Grasa: ' + suma.grasa);
            console.log('Carbohidratos: ' + suma.carbohidratos);
            console.log('Fibra: ' + suma.fibra);
            console.log('Colesterol: ' + suma.colesterol);
            console.log('Sodio: ' + suma.sodio);
            console.log('------------------ACUMULADO---------------------------------------');
          }
        });
      }
    });
    return suma; // Retorna resultado parcial
  }

  // Función que calcula el valor nutricional total, incluyendo recetas e ingredientes 
  OnCalcularVN() {
    const iduser = this.authService.getUserId();
    const resp: any = [];
    let sumaitems = { // Suma total
          energia: null,
          proteina: null,
          grasa: null,
          carbohidratos: null,
          fibra: null,
          colesterol: null,
          sodio: null
          };

    this.rctvalores.forEach( item => {
      this.recetas.forEach( rct => {
        if (item.iditem === rct.id) { // Usar las recetas que coincidan con las del input
          const cloneitem = Object.assign({}, item); // clonar objetos antes de pasarlos a una función
          const nuevasuma = {
            energia: 0,
            proteina: 0,
            grasa: 0,
            carbohidratos: 0,
            fibra: 0,
            colesterol: 0,
            sodio: 0
          };
          const res = this.vnReceta(iduser, cloneitem, item.iditem, nuevasuma);

          sumaitems.energia = Number((sumaitems.energia + res.energia).toFixed(this.cifras));
          sumaitems.proteina = Number((sumaitems.proteina + res.proteina).toFixed(this.cifras));
          sumaitems.grasa = Number((sumaitems.grasa + res.grasa).toFixed(this.cifras));
          sumaitems.carbohidratos = Number((sumaitems.carbohidratos + res.carbohidratos).toFixed(this.cifras));
          sumaitems.fibra = Number((sumaitems.fibra + res.fibra).toFixed(this.cifras));
          sumaitems.colesterol = Number((sumaitems.colesterol + res.colesterol).toFixed(this.cifras));
          sumaitems.sodio = Number((sumaitems.sodio + res.sodio).toFixed(this.cifras));
          console.log('------------------RECETAS---------------------------------------');
          console.log('Energia: ' + sumaitems.energia);
          console.log('Proteina: ' + sumaitems.proteina);
          console.log('Grasa: ' + sumaitems.grasa);
          console.log('Carbohidratos: ' + sumaitems.carbohidratos);
          console.log('Fibra: ' + sumaitems.fibra);
          console.log('Colesterol: ' + sumaitems.colesterol);
          console.log('Sodio: ' + sumaitems.sodio);
          console.log('---------------------------------------------------------');
        }
      });
    });

    this.ingvalores.forEach( item => {
      this.ingredientes.forEach( ing => {
        if (item.iditem === ing.id) { // Usar los ingredientes que coincidan con los del input
            const cloneitem = Object.assign({}, item); // clonar objetos antes de pasarlos a una función
            const clonesumaitems = Object.assign({}, sumaitems);

            sumaitems = this.vnIngredientes(cloneitem, clonesumaitems, ing);
        }
      });
    });

    console.log('-----------------TOTAL-----------------------------------');
    console.log('Energia: ' + sumaitems.energia);
    console.log('Proteina: ' + sumaitems.proteina);
    console.log('Grasa: ' + sumaitems.grasa);
    console.log('Carbohidratos: ' + sumaitems.carbohidratos);
    console.log('Fibra: ' + sumaitems.fibra);
    console.log('Colesterol: ' + sumaitems.colesterol);
    console.log('Sodio: ' + sumaitems.sodio);
    console.log('------------------END------------------------------------');
    if (sumaitems.energia !== null) { // Si fueron asignados los datos de valor nutricional
    sumaitems.energia = Number((sumaitems.energia).toFixed(2)) + ' Kcal.';
    sumaitems.proteina = Number((sumaitems.proteina).toFixed(2)) + ' g';
    sumaitems.grasa = Number((sumaitems.grasa).toFixed(2)) + ' g';
    sumaitems.carbohidratos = Number((sumaitems.carbohidratos).toFixed(2)) + ' g';
    sumaitems.fibra = Number((sumaitems.fibra).toFixed(2)) + ' g';
    sumaitems.colesterol = Number((sumaitems.colesterol).toFixed(2)) + ' mg';
    sumaitems.sodio = Number((sumaitems.sodio).toFixed(2)) + ' mg';
    } else {
      sumaitems.energia = 0 + ' Kcal.';
      sumaitems.proteina = 0 + ' g';
      sumaitems.grasa = 0 + ' g';
      sumaitems.carbohidratos = 0 + ' g';
      sumaitems.fibra = 0 + ' g';
      sumaitems.colesterol = 0 + ' mg';
      sumaitems.sodio = 0 + ' mg';
    }
    Object.keys(sumaitems).forEach(e => { // Convertir objeto sumaitems en un array resp
    const obj = {
          nombre: e,
          valor: sumaitems[e]
          };
    resp.push(obj);
    });

    return {
      array: resp
       };
  }
  // Función que abre la ventana del modal. Le pasa al modal los datos a mostrar
  async abrirModal() {
    const res = this.OnCalcularVN();
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: { // Pasar datos
        obj: res,
        titulomodal: 'Valor Nutricional Total',
        activarboton: false
      }
    });
    await modal.present();
  }



}
