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
    let pattern: any;

    switch (tipo) { // Se escoge la expresion regular del patrón
      case 3: // Se usa patrón unidades
          pattern = new RegExp('^(([1-9]{1}[0-9]{0,})|([0]{1}))$');
          break;
      default: // Se usa patrón peso
          pattern = new RegExp('^(([1-9]{1}[0-9]{0,})|([0]{1}))([.]{1}[0-9]{1,})?$');
    }

    if ((valor === '' || Number(valor) === 0) || (valor !== '' && !pattern.test(valor))) {
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
            if (typeof(valores) !== 'undefined' && valores.length > 0) { // El item ya se había guardado.
              if (res < 0) {
                ing.peso_disp = 0;
                valores[0].disp = 0;
                if (valores[0].valor === null) {
                  valores[0].valor = Math.abs(res);
                } else {
                  valores[0].valor = Number((valores[0].valor + Math.abs(res)).toFixed(this.cifras));
                }
              } else {
                ing.peso_disp = res;
                valores[0].disp = res;
                valores[0].valor = 0;
              }
            } else { // Sino, el item se guarda por primera vez con push
              if (res < 0) {
                const obj = {
                  nombre: ing.nombre,
                  valor: null,
                  tipo: 2,
                  iditem: ing.id,
                  disp: null
                };
                obj.valor = Math.abs(res);
                ing.peso_disp = 0;
                obj.disp = 0;
                this.resp.push(obj);
              } else {
                const obj = {
                  nombre: ing.nombre,
                  valor: null,
                  tipo: 2,
                  iditem: ing.id,
                  disp: null
                };
                obj.valor = 0;
                ing.peso_disp = res;
                obj.disp = res;
                this.resp.push(obj);
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
            if (typeof(valores) !== 'undefined' && valores.length > 0) { // El item ya se había guardado.
              if (res < 0) {
                mte.unidades_disp = 0;
                valores[0].disp = 0;
                if (valores[0].valor === null) {
                  valores[0].valor = Math.abs(res);
                } else {
                  valores[0].valor = Number((valores[0].valor + Math.abs(res)).toFixed(this.cifras));
                }
              } else {
                mte.unidades_disp = res;
                valores[0].disp = res;
                valores[0].valor = 0;
              }
            } else { // Sino, el item se guarda por primera vez con push
              if (res < 0) {
                const obj = {
                  nombre: mte.nombre,
                  valor: null,
                  tipo: 3,
                  iditem: mte.id,
                  disp: null
                };
                obj.valor = Math.abs(res);
                mte.unidades_disp = 0;
                obj.disp = 0;
                this.resp.push(obj);
              } else {
                const obj = {
                  nombre: mte.nombre,
                  valor: null,
                  tipo: 3,
                  iditem: mte.id,
                  disp: null
                };
                obj.valor = 0;
                mte.unidades_disp = res;
                obj.disp = res;
                this.resp.push(obj);
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

  // Función que guarda los items que tienen una menor cantidad en el inventario (que la solicitada), en un array
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

  // Función recursiva que guarda los items con las cantidades a agregar, para 1 receta
  agregarCantidadReceta(iduser: number, item: Cantidad, recetaId: number) {
    this.rctsings.forEach((rctitem) => { // Para cada ingrediente asociado
      if (rctitem.idreceta === recetaId) {
        this.cloneingredientes.forEach( ing => {
          if (rctitem.idingrediente === ing.id) { // Buscar ingredientes que coinciden con los del usuario
            const res = Number((ing.peso_disp + (item.cantidad * rctitem.peso)).toFixed(this.cifras));
            let valores: any[] = [];
            valores = this.getObjetoRespById(ing.id, 2);
            if (typeof(valores) !== 'undefined' && valores.length > 0) { // El item ya se había guardado.
                ing.peso_disp = res;
                valores[0].valor = res;
            } else { // Sino, el item se guarda por primera vez con push
                const obj = {
                  nombre: ing.nombre,
                  valor: null,
                  tipo: 2,
                  iditem: ing.id
                };
                obj.valor = res;
                ing.peso_disp = res;
                this.resp.push(obj);
            }
          }
        });
      }
    });
    this.rctsmtes.forEach((rctitem) => { // Para cada material externo asociado
      if (rctitem.idreceta === recetaId) {
        this.clonematerialesexternos.forEach( mte => {
          if (rctitem.idmaterialexterno === mte.id) { // Buscar materiales externos que coinciden con los del usuario
            const res = Number((mte.unidades_disp + (item.cantidad * rctitem.unidades)).toFixed(this.cifras));
            let valores: any[] = [];
            valores = this.getObjetoRespById(mte.id, 3);
            if (typeof(valores) !== 'undefined' && valores.length > 0) { // El item ya se había guardado.
                mte.unidades_disp = res;
                valores[0].valor = res;
            } else { // Sino, el item se guarda por primera vez con push
                const obj = {
                  nombre: mte.nombre,
                  valor: null,
                  tipo: 3,
                  iditem: mte.id
                };
                obj.valor = res;
                mte.unidades_disp = res;
                this.resp.push(obj);
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
            this.agregarCantidadReceta(iduser, cloneitem, rctitem.idsubreceta); // Llamada recursiva para las subrecetas
          }
        });
      }
    });
  }

  // Función que guarda los items con las cantidades a agregar en el inventario, en un array
  agregarCantidadporItem() {
    this.clonematerialesexternos = JSON.parse(JSON.stringify(this.materialesexternos)); // clonar arreglos de items
    this.cloneingredientes = JSON.parse(JSON.stringify(this.ingredientes));

    const iduser = this.authService.getUserId();
    this.resp.length = 0;

    this.ingvalores.forEach( item => {
      this.cloneingredientes.forEach( ing => {
        if (item.iditem === ing.id) { // Usar los ingredientes que coincidan con los del input
          const res = Number((ing.peso_disp + item.cantidad).toFixed(this.cifras));
          const obj = {
            nombre: ing.nombre,
            valor: null,
            tipo: 2,
            iditem: ing.id
          };
          this.resp.push(obj);
          ing.peso_disp = res;
          this.resp[this.resp.length - 1].valor = res;
        }
      });
    });

    this.mtevalores.forEach( item => {
      this.clonematerialesexternos.forEach( mte => {
        if (item.iditem === mte.id) { // Usar los materiales externos que coincidan con los del input
          const res = Number((mte.unidades_disp + item.cantidad).toFixed(this.cifras));
          const obj = {
            nombre: mte.nombre,
            valor: null,
            tipo: 3,
            iditem: mte.id
          };
          this.resp.push(obj);
          mte.unidades_disp = res;
          this.resp[this.resp.length - 1].valor = res;
        }
      });
    });

    this.rctvalores.forEach( item => {
      this.recetas.forEach( rct => {
        if (item.iditem === rct.id) { // Usar las recetas que coincidan con los del input
          const cloneitem = Object.assign({}, item); // clonar objeto antes de pasarlo a la funcion
          this.agregarCantidadReceta(iduser, cloneitem, item.iditem);
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

  // Función que decide cuál información es la que debe mostrarse en el modal. Permite desechar items con la entrada opcion.
  async onDecidirModal(opcion: number) {
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
      const respboolean = this.resp.every( item => { // respboolean ayuda a determinar si el exceso en el pedido es nulo
          return item.valor <= 0;
      });

      let modo = 1; // El modo actual muestra lo que sobra en el inventario
      if (respboolean) { // Todos los items alcanzan para la orden
        this.resp.forEach( item => {
          item.valor = item.disp;
        });
        if (opcion === 1) {
          titulo = 'Orden posible, quedarían:';
        } else {
          titulo = 'Al desechar, quedarían:';
        }
      } else {
        modo = 2; // El modo actual muestra lo que hace falta para cumplir con la orden
        this.resp = this.resp.filter( item => { // Obtener los items que realmente hacen faltan (se excluyen los que tengan valor 0)
            return item.valor > 0;
        });
        titulo = 'Falta tener a disposición:';
      }
      let cloneresp = [];
      cloneresp = JSON.parse(JSON.stringify(this.resp)); // clonar arreglo

      cloneresp.forEach( item => { // Aplicar decimales y agregar símbolo a valor y disp
        if (item.tipo === 3) { // Si son materiales externos
          item.valor = Number((item.valor).toFixed(0)) + ' uds.';
          item.disp = Number((item.disp).toFixed(0)) + ' uds.';
        } else {
          item.valor = Number((item.valor).toFixed(2)) + ' g';
          item.disp = Number((item.disp).toFixed(2)) + ' g';
        }
      });

      let activar = false;
      if (opcion === 2 && modo === 1) { // Si la opción es la de desechar items
         activar = true;
      }

      const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: { // Pasar datos
        obj: {
        array:  cloneresp},
        titulomodal: titulo,
        activarboton: activar
      }
      });
      await modal.present();

      const { data } = await modal.onWillDismiss();
      console.log('Retorno del modal :', data);

      if (data) {
        console.log('SE REALIZA LLAMADA A BD :', data);
        this.itemService.realizarAgregarDesechar(this.resp).subscribe((res) => { // Modificar inventario en BD
          if (res) { // Si existe
            res.data.array.forEach(item => {
              if (item.tipo === 2) {
                this.ingredientes.forEach( ing => {
                  if (item.iditem === ing.id) { // Usar los materiales externos que coincidan con los del input
                    ing.peso_disp = item.valor;
                  }
                });
              }
              if (item.tipo === 3) {
                this.materialesexternos.forEach( mte => {
                  if (item.iditem === mte.id) { // Usar los materiales externos que coincidan con los del input
                    mte.unidades_disp = item.valor;
                  }
                });
              }
            });
            this.onToast('Operación exitosa!'); // Desplegar mensaje de éxito
          }
        });
      }
    }

  }

  // Función que realiza los cambios de agregar cantidades de items al inventario.
  async onAgregarCantidades() {
    this.agregarCantidadporItem(); // Llamar función
    let titulo = '';

    this.resp = this.resp.filter( item => { // Obtener los items a los que realmente se les agregó cantidad
      if (item) {
        return item.valor !== null;
      }
    });

    if (this.resp.length === 0) {
      this.onToast('Hay que asignar cantidades primero'); // Desplegar mensaje de error
    } else {
      console.log(this.resp);
      titulo = 'Al agregar, quedarían:';

      let cloneresp = [];
      cloneresp = JSON.parse(JSON.stringify(this.resp)); // clonar arreglo

      cloneresp.forEach( item => { // Aplicar decimales y agregar símbolo a valor y disp
        if (item.tipo === 3) { // Si son materiales externos
          item.valor = Number((item.valor).toFixed(0)) + ' uds.';
        } else {
          item.valor = Number((item.valor).toFixed(2)) + ' g';
        }
      });

      const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: { // Pasar datos
        obj: {
        array:  cloneresp},
        titulomodal: titulo,
        activarboton: true
      }
      });
      await modal.present();

      const { data } = await modal.onWillDismiss();
      console.log('Retorno del modal :', data);

      if (data) {
        console.log('SE REALIZA LLAMADA A BD :', data);
        this.itemService.realizarAgregarDesechar(this.resp).subscribe((res) => { // Modificar inventario en BD
          if (res) { // Si existe
            res.data.array.forEach(item => {
              if (item.tipo === 2) {
                this.ingredientes.forEach( ing => {
                  if (item.iditem === ing.id) { // Usar los materiales externos que coincidan con los del input
                    ing.peso_disp = item.valor;
                  }
                });
              }
              if (item.tipo === 3) {
                this.materialesexternos.forEach( mte => {
                  if (item.iditem === mte.id) { // Usar los materiales externos que coincidan con los del input
                    mte.unidades_disp = item.valor;
                  }
                });
              }
            });
            this.onToast('Operación exitosa!'); // Desplegar mensaje de éxito
          }
        });
      }
    }

  }


}
