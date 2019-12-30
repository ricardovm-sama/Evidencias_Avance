import { Component, OnInit } from '@angular/core';
import { MaterialExterno } from 'src/app/materialexterno.model';
import { ItemService } from 'src/app/item.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Ingrediente } from 'src/app/ingrediente.model';
import { Receta } from 'src/app/receta.model';
import { Cantidad } from 'src/app/cantidad.model';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-realizar',
  templateUrl: './realizar.page.html',
  styleUrls: ['./realizar.page.scss'],
})
export class RealizarPage implements OnInit {
  materialesexternos: MaterialExterno[] = [];
  ingredientes: Ingrediente[] = [];
  recetas: Receta[] = [];

  clonematerialesexternos: MaterialExterno[] = [];
  cloneingredientes: Ingrediente[] = [];

  rctsrcts: any[] = [];
  rctsings: any[] = [];
  rctsmtes: any[] = [];

  rctvalores: Cantidad[] = [];
  ingvalores: Cantidad[] = [];
  mtevalores: Cantidad[] = [];
  textoBuscar = '';

  cifras = 3;
  resp: any[] = [];

  constructor(
    public toastController: ToastController,
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
    case 1: // Si son recetas, ingredientes o materiales externos
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
    case 1: // Si son recetas, ingredientes o materiales externos
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
    const patternPeso = new RegExp('^(([1-9]{1}[0-9]{0,})|([0]{1}))[.]{1}[0-9]{2}$');

    if ((valor === '' || valor === '0.00') || (valor !== '' && !patternPeso.test(valor))) {
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

  // Función que obtiene un ítem usando su id de ítem y tipo, en el array global resp
  getObjetoRespById(id: number, tipo: number) {
    return this.resp.filter( item => {
      if (item) {
        return item.iditem === id && item.tipo === tipo;
      }
    });
  }

  // Función recursiva que guarda los items que tienen una menor cantidad en el inventario (que la solicitada) para 1 receta
  carenciaReceta(iduser: number, item: Cantidad, recetaId: number) {
    this.rctsings.forEach((rctitem) => { // Para cada ingrediente asociado
      if (rctitem.idreceta === recetaId) {
        this.cloneingredientes.forEach( ing => {
          if (rctitem.idingrediente === ing.id) { // Buscar ingredientes que coinciden con los del usuario
            const res = Number((ing.peso_disp - (item.cantidad * rctitem.peso)).toFixed(this.cifras));
            let valores: any[] = [];
            valores = this.getObjetoRespById(ing.id, 2);
            if (res < 0) {
              ing.peso_disp = 0; // Ya no queda más del item en el inventario
              if (typeof(valores) !== 'undefined' && valores.length > 0) { // El item ya se había guardado.
                valores[0].disp = 0;
                if (valores[0].valor === null) {
                  valores[0].valor = Math.abs(res);
                } else {
                  valores[0].valor = Number((valores[0].valor + Math.abs(res)).toFixed(this.cifras));
                }
              } else { // Sino, el item se guarda por primera vez con push
                const obj = {
                  nombre: ing.nombre,
                  valor: null,
                  tipo: 2,
                  iditem: ing.id,
                  disp: null
                };
                obj.valor = Math.abs(res);
                obj.disp = 0;
                this.resp.push(obj);
              }
            } else {
              ing.peso_disp = res;
              if (typeof(valores) !== 'undefined' && valores.length > 0) { // El item ya se había guardado.
                valores[0].disp = res;
                valores[0].valor = 0;
              }
            }
          }
        });
      }
    });
    this.rctsmtes.forEach((rctitem) => { // Para cada material externo asociado
      if (rctitem.idreceta === recetaId) {
        this.clonematerialesexternos.forEach( mte => {
          if (rctitem.idmaterialexterno === mte.id) { // Buscar materiales externos que coinciden con los del usuario
            const res = Number((mte.unidades_disp - (item.cantidad * rctitem.unidades)).toFixed(this.cifras));
            let valores: any[] = [];
            valores = this.getObjetoRespById(mte.id, 3);
            if (res < 0) {
              mte.unidades_disp = 0; // Ya no queda más del item en el inventario
              if (typeof(valores) !== 'undefined' && valores.length > 0) { // El item ya se había guardado.
                valores[0].disp = 0;
                if (valores[0].valor === null) {
                  valores[0].valor = Math.abs(res);
                } else {
                  valores[0].valor = Number((valores[0].valor + Math.abs(res)).toFixed(this.cifras));
                }
              } else { // Sino, el item se guarda por primera vez con push
                const obj = {
                  nombre: mte.nombre,
                  valor: null,
                  tipo: 3,
                  iditem: mte.id,
                  disp: null
                };
                obj.valor = Math.abs(res);
                obj.disp = 0;
                this.resp.push(obj);
              }
            } else {
              mte.unidades_disp = res;
              if (typeof(valores) !== 'undefined' && valores.length > 0) { // El item ya se había guardado.
                 valores[0].disp = res;
                 valores[0].valor = 0;
              }
            }
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
            this.carenciaReceta(iduser, cloneitem, rctitem.idsubreceta); // Llamada recursiva para las subrecetas
          }
        });
      }
    });
  }

  // Función que retorna un array que guarda los items que tienen una menor cantidad en el inventario (que la solicitada)
  obtenerCarenciaporItem() {
    this.clonematerialesexternos = JSON.parse(JSON.stringify(this.materialesexternos)); // clonar arreglos de items
    this.cloneingredientes = JSON.parse(JSON.stringify(this.ingredientes));

    const iduser = this.authService.getUserId();
    this.resp.length = 0;

    this.ingvalores.forEach( item => {
      this.cloneingredientes.forEach( ing => {
        if (item.iditem === ing.id) { // Usar los ingredientes que coincidan con los del input
          const res = Number((ing.peso_disp - item.cantidad).toFixed(this.cifras));
          const obj = {
            nombre: ing.nombre,
            valor: null,
            tipo: 2,
            iditem: ing.id,
            disp: null
          };
          this.resp.push(obj);
          if (res < 0) {
            ing.peso_disp = 0; // Ya no queda más del item en el inventario
            this.resp[this.resp.length - 1].disp = 0;
            this.resp[this.resp.length - 1].valor = Math.abs(res);
          } else {
            ing.peso_disp = res;
            this.resp[this.resp.length - 1].disp = res;
            this.resp[this.resp.length - 1].valor = 0;
          }
        }
      });
    });

    this.mtevalores.forEach( item => {
      this.clonematerialesexternos.forEach( mte => {
        if (item.iditem === mte.id) { // Usar los materiales externos que coincidan con los del input
          const res = Number((mte.unidades_disp - item.cantidad).toFixed(this.cifras));
          const obj = {
            nombre: mte.nombre,
            valor: null,
            tipo: 3,
            iditem: mte.id,
            disp: null
          };
          this.resp.push(obj);
          if (res < 0) {
            mte.unidades_disp = 0; // Ya no queda más del item en el inventario
            this.resp[this.resp.length - 1].disp = 0;
            this.resp[this.resp.length - 1].valor = Math.abs(res);
          } else {
            mte.unidades_disp = res;
            this.resp[this.resp.length - 1].disp = res;
            this.resp[this.resp.length - 1].valor = 0;
          }
        }
      });
    });

    this.rctvalores.forEach( item => {
      this.recetas.forEach( rct => {
        if (item.iditem === rct.id) { // Usar las recetas que coincidan con los del input
          const cloneitem = Object.assign({}, item); // clonar objeto antes de pasarlo a la funcion
          this.carenciaReceta(iduser, cloneitem, item.iditem);
        }
      });
    });

  }

  // Función que crea el toast y lo muestra (con el mensaje recibido a través del input)
  async onToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

  // Función que decide cuál información es la que debe mostrarse en el modal.
  async onDecidirModal() {
    this.obtenerCarenciaporItem(); // Llamar función
    let titulo = '';

    this.resp = this.resp.filter( item => { // Obtener los items necesarios para la orden
      if (item) {
        return item.disp !== null;
      }
    });

    if (this.resp.length === 0) {
      this.onToast('Hay que asignar cantidades primero'); // Desplegar mensaje de error
    } else {
      console.log(this.resp);
      const respboolean = this.resp.every( item => { // Determinar si el exceso en el pedido es nulo
          return item.valor <= 0;
      });

      this.resp.forEach( item => { // Aplicar ceil a materiales externos y agregar símbolo a valor y disp
        if (item.tipo === 3) {
          item.valor = Number((Math.ceil(item.valor)).toFixed(0)) + ' uds.';
          item.disp = Number((Math.ceil(item.disp)).toFixed(0)) + ' uds.';
        } else {
          item.valor = Number((item.valor).toFixed(2)) + ' g';
          item.disp = Number((item.disp).toFixed(2)) + ' g';
        }
      });

      if (respboolean) { // Todos los items alcanzan para la orden
        this.resp.forEach( item => {
          item.valor = item.disp;
        });
        titulo = 'Orden posible, quedan:';
      } else {
        titulo = 'Falta tener a disposición:';
      }

      const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: { // Pasar datos
        obj: {
        array:  this.resp},
        titulomodal: titulo
      }
      });
      await modal.present();
    }
    }




}
