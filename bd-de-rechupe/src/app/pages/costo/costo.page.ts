import { Component, OnInit } from '@angular/core';
import { MaterialExterno } from 'src/app/materialexterno.model';
import { ItemService } from 'src/app/item.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Ingrediente } from 'src/app/ingrediente.model';
import { Receta } from 'src/app/receta.model';
import { Cantidad } from 'src/app/cantidad.model';
import { PopoverController, ModalController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-costo',
  templateUrl: './costo.page.html',
  styleUrls: ['./costo.page.scss'],
})
export class CostoPage implements OnInit {
  materialesexternos: MaterialExterno[] = [];
  ingredientes: Ingrediente[] = [];
  recetas: Receta[] = [];

  rctsrcts: any[] = [];
  rctsings: any[] = [];
  rctsmtes: any[] = [];

  rctvalores: Cantidad[] = [];
  ingvalores: Cantidad[] = [];
  mtevalores: Cantidad[] = [];
  textoBuscar = '';

  cifras = 0;

  constructor(
    private itemService: ItemService,
    private  authService: AuthService,
    private modalCtrl: ModalController
  //  private popoverCtrl: PopoverController
    ) { }

  ngOnInit() {
    this.authService.getKeyValue('userId').then((iduser) => {
      if (iduser) {
        this.authService.setUserId(iduser);
        this.rctvalores.length = 0;
        this.ingvalores.length = 0;
        this.mtevalores.length = 0;
      }
    });
  }

  // Función que carga la lista de materiales externos
  ionViewDidEnter() {
    const iduser = this.authService.getUserId();
    if (iduser) {
      console.log('UserID: ' + iduser);
      this.itemService.getAllMaterialesExternos(iduser).subscribe((res) => { // Obtener materiales externos
      this.materialesexternos = res.data;
      });
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
      this.itemService.getRecetasMaterialesExternos(iduser).subscribe((res) => { // Obtener recetas_materialesexternos
      this.rctsmtes = res.data;
      });
    }
  }
// Función que obtiene un ítem usando su id de ítem (en distintos arreglos dependiendo del tipo del ítem)
getObjetoById(id: number, tipo: number) {
  switch (tipo) {
    case 1:// Si son recetas, ingredientes o materiales externos
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
    case 3:
      return this.mtevalores.filter( item => {
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
    case 1:// Si son recetas, ingredientes o materiales externos
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
    case 3:
      this.mtevalores = this.mtevalores.filter( item => { // Se remueve el elemento del array
        return valores.indexOf( item ) < 0;
    });
      console.log('Largo Arreglo: ' + this.mtevalores.length);
      break;
    }
  }
  return;
}

  // Función que va guardando los inputs del usuario (en distintos arreglos dependiendo del tipo del ítem)
  addValue(tipo: number, entry: any, iditems: number) {
    const valor = entry.value;
    let pattern: any;

    switch (tipo) { // Se escoge la expresion regular del patrón
      case 3: // Se usa patrón unidades
          pattern = new RegExp('^(([1-9]{1}[0-9]{0,})|([0]{1}))$');
          break;
      default: // Se usa patrón peso
          pattern = new RegExp('^(([1-9]{1}[0-9]{0,})|([0]{1}))[.]{1}[0-9]{2}$');
    }

    if ((valor === '' || valor === '0.00') || (valor !== '' && !pattern.test(valor))) {
      this.borrarElementosContenidos(iditems, tipo);

      switch (tipo) { // Cómo se inicializa el placeholder
        case 3: // Si son materiales externos
            entry.placeholder = '0'; // Restablecer el placeholder
            break;
        default: // Cualquier otro item
            entry.placeholder = '0.00'; // Restablecer el placeholder
      }
      entry.value = ''; // Restablecer el valor
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
      switch (tipo) { // Si son recetas, ingredientes o materiales externos
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
        case 3:
            this.mtevalores.push(item);
            console.log('IDItem: ' + this.mtevalores[this.mtevalores.length - 1].iditem + ', Valor asignado: '
            + this.mtevalores[this.mtevalores.length - 1].cantidad);
            console.log('Largo Arreglo: ' + this.mtevalores.length);
            break;
      }
    }
  }

  // Función recursiva que calcula el costo total de 1 receta
  costoReceta(iduser: number, item: Cantidad, recetaId: number, suma: number) {
    this.rctsings.forEach((rctitem) => { // Para cada ingrediente asociado
      if (rctitem.idreceta === recetaId) {
        this.ingredientes.forEach( ing => {
          if (rctitem.idingrediente === ing.id) { // Buscar ingredientes que coinciden con los del usuario
            const rescosto = Number((Math.ceil(((ing.precio / ing.peso) * item.cantidad * rctitem.peso) / 5) * 5).toFixed(this.cifras));
            suma = Number((suma + rescosto).toFixed(this.cifras));
            console.log('Ingrediente: ' + ing.nombre + ', Rescosto: ' + rescosto);
          }
        });
      }
    });
    console.log('ACUMULADO: ' + suma);
    this.rctsmtes.forEach((rctitem) => { // Para cada material externo asociado
      if (rctitem.idreceta === recetaId) {
        this.materialesexternos.forEach( mte => {
          if (rctitem.idmaterialexterno === mte.id) { // Buscar materiales externos que coinciden con los del usuario
            const rescosto = Number((Math.ceil(((mte.precio / mte.unidades) *
            item.cantidad * rctitem.unidades) / 5) * 5).toFixed(this.cifras));
            suma = Number((suma + rescosto).toFixed(this.cifras));
            console.log('M.EXTERNO: ' + mte.nombre + ', Rescosto: ' + rescosto);
          }
        });
      }
    });
    console.log('ACUMULADO: ' + suma);
    this.rctsrcts.forEach((rctitem) => { // Para cada receta asociada
      if (rctitem.idreceta === recetaId) {
        this.recetas.forEach( rct => {
          if (rctitem.idreceta === rct.id) { // Buscar recetas que coinciden con las del usuario
            const cloneitem = Object.assign({}, item); // clonar objetos antes de pasarlos a una función
            cloneitem.cantidad = Number((item.cantidad * rctitem.cantidad).toFixed(3));
            suma = Number((suma +
              this.costoReceta(iduser, cloneitem, rctitem.idsubreceta, 0)).toFixed(this.cifras)); // Llamada recursiva para las subrecetas
          }
        });
      }
    });
    return suma; // Retorna resultado parcial
  }

  // Función que calcula los costos individuales y el total
  OnCalcularCostos() {
    const iduser = this.authService.getUserId();
    const resp: any = [];

    this.rctvalores.forEach( item => {
      this.recetas.forEach( rct => {
        if (item.iditem === rct.id) { // Usar las recetas que coincidan con los del input
          const cloneObject = Object.assign({}, item); // clonar objeto antes de pasarlo a la funcion
          const rescosto = this.costoReceta(iduser, cloneObject, item.iditem, 0);
          const obj = {
            nombre: rct.nombre,
            valor: rescosto,
            cantidad: item.cantidad
          };
          resp.push(obj);
        }
      });
    });

    this.ingvalores.forEach( item => {
      this.ingredientes.forEach( ing => {
        if (item.iditem === ing.id) { // Usar los ingredientes que coincidan con los del input
          const rescosto = Number((Math.ceil(((ing.precio / ing.peso) * item.cantidad) / 5) * 5).toFixed(this.cifras));
          const obj = {
            nombre: ing.nombre,
            valor: rescosto,
            cantidad: item.cantidad
          };
          resp.push(obj);
        }
      });
    });

    this.mtevalores.forEach( item => {
      this.materialesexternos.forEach( mte => {
        if (item.iditem === mte.id) { // Usar los materiales externos que coincidan con los del input
          const rescosto = Number((Math.ceil(((mte.precio / mte.unidades) * item.cantidad) / 5) * 5).toFixed(this.cifras));
          const obj = {
            nombre: mte.nombre,
            valor: rescosto,
            cantidad: item.cantidad
          };
          resp.push(obj);
        }
      });
    });

    let suma = 0;
    resp.forEach( item => {
      console.log('Nombre: ' + item.nombre + ', Costo: ' + item.valor);
      suma = suma + Number((item.valor).toFixed(0));
      item.valor = '₡ ' + (item.valor).toFixed(0);
    });
    console.log('TOTAL: ' + suma);
    const total = {
      nombre: 'TOTAL',
      valor: '₡ ' + (suma).toFixed(0),
      cantidad: ''
    };
    resp.push(total); // Guardar el costo total
    return {
      array: resp
       };
  }

/*  async mostrarPop( evento ) {
    const popover = await this.popoverCtrl.create({
      component: PopinfoComponent,
    //  event: evento,
      mode: 'ios',
      backdropDismiss: true
    });

    await popover.present();
  }*/
  // Función que abre la ventana del modal. Le pasa al modal los datos a mostrar
  async abrirModal() {
    const res = this.OnCalcularCostos();
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: { // Pasar datos
        obj: res,
        titulomodal: 'Información Costos',
        activarboton: false
      }
    });
    await modal.present();
  }


}
