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

  // Función que obtiene el texto introducido en la barra de búsqueda
  search( event ) {
    this.textoBuscar = event.detail.value;
  }

  getObjetoById(id: number, tipo: number) {
    switch (tipo) {
      case 1:
        return this.rctvalores.filter( item => {
          if (item) {
            return item.id === id;
          }
          return null;
        });
      case 2:
        return this.ingvalores.filter( item => {
          if (item) {
            return item.id === id;
          }
          return null;
        });
      case 3:
        return this.mtevalores.filter( item => {
          if (item) {
            return item.id === id;
          }
          return null;
        });
      }
  }

  borrarElementosContenidos(index: number, tipo: number) {
    let valores: Cantidad[] = [];
    valores = this.getObjetoById(index, tipo);

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

  addValue(valor: string, index: number, tipo: number, entry: any, iditems: number) {
    const patternPeso = new RegExp('^(([1-9]{1}[0-9]{0,})|([0]{1}))[.]{1}[0-9]{2}$');

    if ((valor === '' || valor === '0.00') || (valor !== '' && !patternPeso.test(valor))) {
      this.borrarElementosContenidos(index, tipo);
      entry.value = ''; // Restablecer el placeholder
      entry.placeholder = '0.00';
      return;
    }

    let valores: Cantidad[] = [];
    valores = this.getObjetoById(index, tipo);

    if (typeof(valores) !== 'undefined' && valores.length > 0) { // La entrada del input ya se había guardado.
       console.log('Ya se había guardado el valor del input');
       valores[0].cantidad = Number(valor);
       valores[0].iditem = iditems;
       console.log('ID: ' + valores[0].id + ', Valor asignado: ' + valores[0].cantidad);
    } else { // Sino, la entrada del input se guarda por primera vez con push
      const item: Cantidad = {
        id: index,
        iditem: iditems,
        cantidad: Number(valor)
      };
      switch (tipo) {
        case 1:
            this.rctvalores.push(item);
            console.log('ID: ' + this.rctvalores[this.rctvalores.length - 1].id + ', Valor asignado: '
            + this.rctvalores[this.rctvalores.length - 1].cantidad);
            console.log('Largo Arreglo: ' + this.rctvalores.length);
            break;
        case 2:
            this.ingvalores.push(item);
            console.log('ID: ' + this.ingvalores[this.ingvalores.length - 1].id + ', Valor asignado: '
            + this.ingvalores[this.ingvalores.length - 1].cantidad);
            console.log('Largo Arreglo: ' + this.ingvalores.length);
            break;
        case 3:
            this.mtevalores.push(item);
            console.log('ID: ' + this.mtevalores[this.mtevalores.length - 1].id + ', Valor asignado: '
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
            const rescosto = Number(((ing.precio / ing.peso) * item.cantidad * rctitem.peso).toFixed(2));
            suma = suma + rescosto;
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
            const rescosto = Number(((mte.precio / mte.unidades) * Math.ceil(item.cantidad) * rctitem.unidades).toFixed(2));
            suma = suma + rescosto;
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
            item.cantidad = item.cantidad * rctitem.cantidad;
            suma = suma + this.costoReceta(iduser, item, rctitem.idsubreceta, 0); // Llamada recursiva para las subrecetas
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
        if (item.iditem === rct.id) {
          const cloneObject = Object.assign({}, item); // clonar objeto antes de pasarlo a la funcion
          const rescosto = this.costoReceta(iduser, cloneObject, item.iditem, 0);
          const obj = {
            nombre: rct.nombre,
            costo: rescosto
          };
          resp.push(obj);
        }
      });
    });

    this.ingvalores.forEach( item => {
      this.ingredientes.forEach( ing => {
        if (item.iditem === ing.id) {
          const rescosto = Number(((ing.precio / ing.peso) * item.cantidad).toFixed(2));
          const obj = {
            nombre: ing.nombre,
            costo: rescosto
          };
          resp.push(obj);
        }
      });
    });

    this.mtevalores.forEach( item => {
      this.materialesexternos.forEach( mte => {
        if (item.iditem === mte.id) {
          const rescosto = Number(((mte.precio / mte.unidades) * Math.ceil(item.cantidad)).toFixed(2));
          const obj = {
            nombre: mte.nombre,
            costo: rescosto
          };
          resp.push(obj);
        }
      });
    });

    let suma = 0;
    resp.forEach( item => {
      console.log('Nombre: ' + item.nombre + ', Costo: ' + item.costo);
      suma = suma + item.costo;
    });
    console.log('TOTAL: ' + suma);
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

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: {
        nombre: 'Ricardo',
        pais: 'Salvador'
      }
    });
    await modal.present();
  }


}
