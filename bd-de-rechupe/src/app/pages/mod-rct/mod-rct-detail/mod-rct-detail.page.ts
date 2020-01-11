import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { MaterialExterno } from 'src/app/materialexterno.model';
import { Ingrediente } from 'src/app/ingrediente.model';
import { Receta } from 'src/app/receta.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ItemService } from 'src/app/item.service';
import { ModalCheckPage } from '../../modal-check/modal-check.page';

@Component({
  selector: 'app-mod-rct-detail',
  templateUrl: './mod-rct-detail.page.html',
  styleUrls: ['./mod-rct-detail.page.scss'],
})
export class ModRctDetailPage implements OnInit {
materialesexternos: MaterialExterno[] = [];
ingredientes: Ingrediente[] = [];
recetas: Receta[] = [];

rctsrcts: any[] = [];
rctsings: any[] = [];
rctsmtes: any[] = [];

rctrcts: any[] = [];
rctings: any[] = [];
rctmtes: any[] = [];

clonerctrcts: any[] = [];
clonerctings: any[] = [];
clonerctmtes: any[] = [];

rctnombre = '';
clonerctnombre = '';
recetaId = '';

constructor(
  public toastController: ToastController,
  private itemService: ItemService,
  private  authService: AuthService,
  private modalCtrl: ModalController,
  private router: Router,
  private alertCtrl: AlertController,
  private activatedRoute: ActivatedRoute
  ) { }

ngOnInit() {
  this.authService.getKeyValue('userId').then((iduser) => {
    if (iduser) {
      this.authService.setUserId(iduser);
    }
  });
}

  // Función que carga la lista de recetas
  ionViewDidEnter() {
    const iduser = this.authService.getUserId();
    let recetaId = '';
    console.log('UserID: ' + iduser);
    if (iduser) {
      this.activatedRoute.paramMap.subscribe(paramMap => { // Obtener información de la ruta activada (segmento url dinámico).
        if (!paramMap.has('recetaId')) {
          this.router.navigate(['/mod-rct']); // Redireccionar a la página anterior
        }
        recetaId = paramMap.get('recetaId'); // Asignar el objeto correspondiente del id del url
      });
      console.log('RECETAID: ', recetaId);
      if (recetaId !== '') {
        this.recetaId = recetaId;
        this.itemService.getAllMaterialesExternos(iduser).subscribe((res) => { // Obtener materiales externos
        if (res) {
        this.materialesexternos = res.data;
        }
        });
        this.itemService.getAllIngredientes(iduser).subscribe((res) => { // Obtener ingredientes
        if (res) {
        this.ingredientes = res.data;
        }
        });
        this.itemService.getAllRecetas(iduser).subscribe((res) => { // Obtener recetas
        if (res) {
        this.recetas = res.data;
        let rctnom = [];
        rctnom = res.data.filter( el => el.id === Number(recetaId)); // Obtener la entrada de la receta principal
        const clonerctnom = JSON.parse(JSON.stringify(rctnom)); // clonar arreglo
        this.rctnombre = clonerctnom[0].nombre; // Obtener el nombre de la receta principal
        this.clonerctnombre = this.rctnombre;
        }
        });
        this.itemService.getRecetasRecetas(iduser).subscribe((res) => { // Obtener recetas_recetas
        if (res) {
          this.rctsrcts = res.data;
          this.rctrcts = res.data.filter((elem) => { // Obtener subrecetas
            return elem.iduser === iduser && elem.idreceta === Number(recetaId);
          });
          this.rctrcts.forEach((elem) => { // Agregar las propiedades nombre de subreceta y selected
            this.recetas.forEach((rct) => {
              if (rct.id === elem.idsubreceta) {
                elem.nombre = rct.nombre;
                elem.selected = false;
              }
            });
          });
          this.clonerctrcts = JSON.parse(JSON.stringify(this.rctrcts)); // clonar arreglo
        }
        });
        this.itemService.getRecetasIngredientes(iduser).subscribe((res) => { // Obtener recetas_ingredientes
        if (res) {
        this.rctsings = res.data;
        this.rctings = res.data.filter((elem) => { // Obtener subingredientes
            return elem.iduser === iduser && elem.idreceta === Number(recetaId);
          });
        this.rctings.forEach((elem) => { // Agregar las propiedades nombre de subingrediente y selected
            this.ingredientes.forEach((ing) => {
              if (ing.id === elem.idingrediente) {
                elem.nombre = ing.nombre;
                elem.selected = false;
              }
            });
          });
        this.clonerctings = JSON.parse(JSON.stringify(this.rctings)); // clonar arreglo
        }
        });
        this.itemService.getRecetasMaterialesExternos(iduser).subscribe((res) => { // Obtener recetas_materialesexternos
        if (res) {
        this.rctsmtes = res.data;
        this.rctmtes = res.data.filter((elem) => { // Obtener submaterialesexternos
            return elem.iduser === iduser && elem.idreceta === Number(recetaId);
          });
        this.rctmtes.forEach((elem) => { // Agregar las propiedades nombre de submaterialesexternos y selected
            this.materialesexternos.forEach((mte) => {
              if (mte.id === elem.idmaterialexterno) {
                elem.nombre = mte.nombre;
                elem.selected = false;
              }
            });
          });
        this.clonerctmtes = JSON.parse(JSON.stringify(this.rctmtes)); // clonar arreglo
        }
        });
      }
    }
  }

  // Función que obtiene la entrada original del arreglo correspondiente
getOriginalObj(elem: any, tipo: number) {
  switch (tipo) {
    case 1: // Si son recetas, ingredientes o materiales externos
      console.log('rctsrcts', this.rctsrcts);
      return this.rctsrcts.filter( item => {
          return item.idreceta === elem.idreceta && item.idsubreceta === elem.idsubreceta;
      });
    case 2:
    console.log('rctsings', this.rctsings);
    return this.rctsings.filter( item => {
          return item.idreceta === elem.idreceta && item.idingrediente === elem.idingrediente;
      });
    case 3:
    console.log('rctsmtes', this.rctsmtes);
    return this.rctsmtes.filter( item => {
          return item.idreceta === elem.idreceta && item.idmaterialexterno === elem.idmaterialexterno;
      });
    }
}

  // Función que va guardando los inputs del usuario (en distintos arreglos dependiendo del tipo del ítem)
  addNombre(entry: any) {
    const valor = entry.value;
    const pattern = new RegExp('^(?![ .0-9]+$)[a-zA-Z .0-9]{1,}$');

    if ((valor === '') || (valor !== '' && !pattern.test(valor))) {
      console.log('Entrada original: ', this.rctnombre);
      console.log('Entrada reciente: ', this.clonerctnombre);
      entry.placeholder = this.rctnombre; // Restablecer el placeholder
      entry.value = this.rctnombre; // Restablecer el valor
      this.clonerctnombre = this.rctnombre; // Asignar valor original
      return;
    }
    this.clonerctnombre = entry.value;

  }

  // Función que va guardando los inputs de valores del usuario (en distintos arreglos dependiendo del tipo del ítem)
  addValue(tipo: number, entry: any, elem: any) {
    const valor = entry.value;
    let pattern: any;

    switch (tipo) { // Se escoge la expresion regular del patrón
      case 3: // Se usa patrón unidades
          pattern = new RegExp('^(([1-9]{1}[0-9]{0,})|([0]{1}))$');
          break;
      default: // Se usa patrón peso
          pattern = new RegExp('^(([1-9]{1}[0-9]{0,})|([0]{1}))([.]{1}[0-9]{1,})?$');
    }

    if ((valor === '') || (valor !== '' && !pattern.test(valor))) {
      const res = this.getOriginalObj(elem, tipo); // Buscar entrada original
      console.log('Entrada original: ', res);
      switch (tipo) {
        case 1: // Si son recetas
            console.log('Cantidad: ', res[0].cantidad);
            entry.placeholder = String(res[0].cantidad); // Restablecer el placeholder
            entry.value = String(res[0].cantidad); // Restablecer el valor
            elem.cantidad = res[0].cantidad; // Asignar valor original
            break;
        case 2: // Si son ingredientes
            console.log('Peso: ', res[0].peso);
            entry.placeholder = String(res[0].peso); // Restablecer el placeholder
            entry.value = String(res[0].peso); // Restablecer el valor
            elem.peso = res[0].peso; // Asignar valor original
            break;
        case 3: // Si son materiales externos
            console.log('Unidades: ', res[0].unidades);
            entry.placeholder = String(res[0].unidades); // Restablecer el placeholder
            entry.value = String(res[0].unidades); // Restablecer el valor
            elem.unidades = res[0].unidades; // Asignar valor original
            break;
      }
      return;
    }
    switch (tipo) { // Si son recetas, ingredientes o materiales externos
      case 1: // Si son recetas
          elem.cantidad = Number(entry.value);
          break;
      case 2: // Si son ingredientes
          elem.peso = Number(entry.value);
          break;
      case 3: // Si son materiales externos
          elem.unidades = Number(entry.value);
          break;
    }

  }

    // Función auxiliar. Crea el toast y lo muestra (con el mensaje recibido a través del input)
    async onToast(msj: string, dur: number) {
      const toast = await this.toastController.create({
        message: msj,
        duration: dur
      });
      toast.present();
    }

// Función que modifica la receta y luego redirecciona a la página anterior
  OnModicarReceta() {
    this.alertCtrl.create({
        header: '¿Estás seguro?',
        message: '¿Deseas modificar la receta?',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Modificar',
          handler: () => {
            const obj = {
              arrayrct: this.clonerctrcts,
              arraying: this.clonerctings,
              arraymte: this.clonerctmtes
            };
            console.log('Objeto', obj);
            this.itemService.modificarReceta(Number(this.recetaId), this.clonerctnombre).subscribe((res) => {
              if (res.data) { // Si existe
                console.log('nombre modificado!: ', res.data);
                this.itemService.eliminarRecetaRecetas(Number(this.recetaId)).subscribe((res2) => {
                  if (res2.data) { // Si existe
                    console.log('rctrcts eliminado!: ', res2.data);
                    this.itemService.insertarRecetaRecetas(obj).subscribe((elem) => {
                      if (elem.data) { // Si existe
                        console.log('rctrcts insertado!: ', elem.data);
                        this.itemService.eliminarRecetaIngredientes(Number(this.recetaId)).subscribe((res3) => {
                          if (res3.data) { // Si existe
                            console.log('rctings eliminado!: ', res3.data);
                            this.itemService.insertarRecetaIngredientes(obj).subscribe((elem1) => {
                              if (elem1.data) { // Si existe
                                console.log('rctings insertado!: ', elem1.data);
                                this.itemService.eliminarRecetaMaterialesExternos(Number(this.recetaId)).subscribe((res4) => {
                                  if (res4.data) { // Si existe
                                    console.log('rctmtes eliminado!: ', res4.data);
                                    this.itemService.insertarRecetaMaterialesExternos(obj).subscribe((elem2) => {
                                      if (elem2.data) { // Si existe
                                        console.log('rctmtes insertado!: ', elem2.data);
                                        this.onToast('Operación exitosa!', 2000); // Desplegar mensaje de éxito
                                        this.router.navigate(['/mod-rct']); // Redireccionar a la página anterior
                                      }
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
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

  // Función recursiva que determina si las subrecetas contienen el receta principal (en un ciclo)
  conCiclos(suma: number, recetaId: number, subrecetaId: number) {
    console.log('RECETA RECURSIVA: ', subrecetaId);
    this.rctsrcts.forEach((rctitem) => { // Para cada receta asociada
      if (rctitem.idreceta === subrecetaId) {
        console.log('subreceta RECURSIVA: ', rctitem.idsubreceta);
        if (rctitem.idreceta === rctitem.idsubreceta || rctitem.idreceta === recetaId || rctitem.idsubreceta === recetaId) { // Hay ciclo
          suma = suma + 1;
          console.log('CON CICLOS!!!...');
          console.log('suma: ', suma);
        }
        suma = suma + this.conCiclos(0, recetaId, rctitem.idsubreceta); // Llamada recursiva para las subrecetas
      }
    });
    return suma; // Sin ciclos
  }

// Función que llama el modal para agregar subrecetas
  async onAgregarSubrecetas() {
      let otros = [];
      const conjunto = this.clonerctrcts.map(elem => elem.idsubreceta); // Obtener arreglo de sólo los ids de subrecetas
      console.log('IDRECETA: ', this.recetaId);
      console.log('this.clonerctrcts: ', this.clonerctrcts);
      console.log('recetas: ', this.recetas);
      otros = this.recetas.filter((rct) => { // Lógica de filtrado para obtener las recetas disponibles a agregar
                  return rct.id !== Number(this.recetaId) && !conjunto.includes(rct.id) &&
                  this.conCiclos(0, Number(this.recetaId), rct.id) === 0;
              });
      let cloneotros = JSON.parse(JSON.stringify(otros)); // clonar arreglo
      cloneotros.forEach((elem) => { // Agregar las propiedad selected
          elem.selected = false;
      });
      console.log('SUBRECETAS DISPONIBLES:', cloneotros);
      const modal = await this.modalCtrl.create({
          component: ModalCheckPage,
          componentProps: { // Pasar datos
            array: cloneotros,
            titulomodal: 'Elegir subrecetas:',
            botonmodal: 'Asignar subrecetas',
            mensajealert: '¿Deseas asignar estas subrecetas?',
            confirmalert: 'Asignar',
            activarboton: true
          }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      cloneotros = data.respuesta;
      console.log('SUBRECETAS ELEGIDAS:', cloneotros);
      cloneotros.forEach((elem) => {
        if (elem.selected === true) {
          const obj = {
                  idreceta: Number(this.recetaId),
                  idsubreceta: elem.id,
                  iduser: elem.iduser,
                  cantidad: 0,
                  nombre: elem.nombre,
                  selected: false
                };
          const cloneobj = Object.assign({}, obj); // clonar objeto
          this.clonerctrcts.push(obj);
          this.rctsrcts.push(cloneobj);
        }
      });
      console.log('SUBRECETAS NUEVO:', this.clonerctrcts);
  }

// Función que llama el modal para eliminar subrecetas
  async onEliminarSubrecetas() {
      let otros = JSON.parse(JSON.stringify(this.clonerctrcts)); // clonar arreglo
      const modal = await this.modalCtrl.create({
          component: ModalCheckPage,
          componentProps: { // Pasar datos
            array: otros,
            titulomodal: 'Elegir subrecetas:',
            botonmodal: 'Eliminar subrecetas',
            mensajealert: '¿Deseas eliminar estas subrecetas?',
            confirmalert: 'Eliminar',
            activarboton: true
          }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      otros = data.respuesta;
      console.log('SUBRECETAS ELEGIDAS:', otros);
      otros.forEach((elem) => {
        if (elem.selected === true) {
          this.clonerctrcts = this.clonerctrcts.filter( el => el.idsubreceta !== elem.idsubreceta );
          this.rctsrcts = this.rctsrcts.filter( el => el.idsubreceta !== elem.idsubreceta );
        }
      });
      console.log('SUBRECETAS NUEVO:', this.clonerctrcts);
  }

// Función que llama el modal para agregar ingredientes
  async onAgregarIngredientes() {
      let otros = [];
      const conjunto = this.clonerctings.map(elem => elem.idingrediente); // Obtener arreglo de sólo los ids de subingredientes
      console.log('IDRECETA: ', this.recetaId);
      console.log('this.clonerctings: ', this.clonerctings);
      console.log('ingredientes: ', this.ingredientes);
      otros = this.ingredientes.filter((ing) => { // Lógica de filtrado para obtener los ingredientes disponibles a agregar
                  return !conjunto.includes(ing.id);
              });
      let cloneotros = JSON.parse(JSON.stringify(otros)); // clonar arreglo
      cloneotros.forEach((elem) => { // Agregar las propiedad selected
          elem.selected = false;
      });
      console.log('INGREDIENTES DISPONIBLES:', cloneotros);
      const modal = await this.modalCtrl.create({
          component: ModalCheckPage,
          componentProps: { // Pasar datos
            array: cloneotros,
            titulomodal: 'Elegir ingredientes:',
            botonmodal: 'Asignar ingredientes',
            mensajealert: '¿Deseas asignar estos ingredientes?',
            confirmalert: 'Asignar',
            activarboton: true
          }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      cloneotros = data.respuesta;
      console.log('INGREDIENTES ELEGIDOS:', cloneotros);
      cloneotros.forEach((elem) => {
        if (elem.selected === true) {
          const obj = {
                  idreceta: Number(this.recetaId),
                  idingrediente: elem.id,
                  iduser: elem.iduser,
                  peso: 0,
                  nombre: elem.nombre,
                  selected: false
                };
          const cloneobj = Object.assign({}, obj); // clonar objeto
          this.clonerctings.push(obj);
          this.rctsings.push(cloneobj);
        }
      });
      console.log('INGREDIENTES NUEVO:', this.clonerctings);
  }

// Función que llama el modal para eliminar ingredientes
  async onEliminarIngredientes() {
      let otros = JSON.parse(JSON.stringify(this.clonerctings)); // clonar arreglo
      const modal = await this.modalCtrl.create({
          component: ModalCheckPage,
          componentProps: { // Pasar datos
            array: otros,
            titulomodal: 'Elegir ingredientes:',
            botonmodal: 'Eliminar ingredientes',
            mensajealert: '¿Deseas eliminar estos ingredientes?',
            confirmalert: 'Eliminar',
            activarboton: true
          }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      otros = data.respuesta;
      console.log('INGREDIENTES ELEGIDOS:', otros);
      otros.forEach((elem) => {
        if (elem.selected === true) {
          this.clonerctings = this.clonerctings.filter( el => el.idingrediente !== elem.idingrediente );
          this.rctsings = this.rctsings.filter( el => el.idingrediente !== elem.idingrediente );
        }
      });
      console.log('INGREDIENTES NUEVO:', this.clonerctings);
  }

// Función que llama el modal para agregar materiales externos
  async onAgregarMaterialesExternos() {
      let otros = [];
      const conjunto = this.clonerctmtes.map(elem => elem.idmaterialexterno); // Obtener arreglo de sólo los ids de submaterialesexternos
      console.log('IDRECETA: ', this.recetaId);
      console.log('this.clonerctmtes: ', this.clonerctmtes);
      console.log('materialesexternos: ', this.materialesexternos);
      otros = this.materialesexternos.filter((ing) => { // Lógica de filtrado para obtener los materiales externos disponibles a agregar
                  return !conjunto.includes(ing.id);
              });
      let cloneotros = JSON.parse(JSON.stringify(otros)); // clonar arreglo
      cloneotros.forEach((elem) => { // Agregar las propiedad selected
          elem.selected = false;
      });
      console.log('MATERIALES EXTERNOS DISPONIBLES:', cloneotros);
      const modal = await this.modalCtrl.create({
          component: ModalCheckPage,
          componentProps: { // Pasar datos
            array: cloneotros,
            titulomodal: 'Elegir materiales externos:',
            botonmodal: 'Asignar materiales',
            mensajealert: '¿Deseas asignar estos materiales externos?',
            confirmalert: 'Asignar',
            activarboton: true
          }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      cloneotros = data.respuesta;
      console.log('MATERIALES EXTERNOS ELEGIDOS:', cloneotros);
      cloneotros.forEach((elem) => {
        if (elem.selected === true) {
          const obj = {
                  idreceta: Number(this.recetaId),
                  idmaterialexterno: elem.id,
                  iduser: elem.iduser,
                  unidades: 0,
                  nombre: elem.nombre,
                  selected: false
                };
          const cloneobj = Object.assign({}, obj); // clonar objeto
          this.clonerctmtes.push(obj);
          this.rctsmtes.push(cloneobj);
        }
      });
      console.log('MATERIALES EXTERNOS NUEVO:', this.clonerctmtes);
  }

// Función que llama el modal para eliminar materiales externos
  async onEliminarMaterialesExternos() {
      let otros = JSON.parse(JSON.stringify(this.clonerctmtes)); // clonar arreglo
      const modal = await this.modalCtrl.create({
          component: ModalCheckPage,
          componentProps: { // Pasar datos
            array: otros,
            titulomodal: 'Elegir materiales externos:',
            botonmodal: 'Eliminar materiales',
            mensajealert: '¿Deseas eliminar estos materiales externos?',
            confirmalert: 'Eliminar',
            activarboton: true
          }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      otros = data.respuesta;
      console.log('MATERIALES EXTERNOS ELEGIDOS:', otros);
      otros.forEach((elem) => {
        if (elem.selected === true) {
          this.clonerctmtes = this.clonerctmtes.filter( el => el.idmaterialexterno !== elem.idmaterialexterno );
          this.rctsmtes = this.rctsmtes.filter( el => el.idmaterialexterno !== elem.idmaterialexterno );
        }
      });
      console.log('MATERIALES EXTERNOS NUEVO:', this.clonerctmtes);
  }




}
