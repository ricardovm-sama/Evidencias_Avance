import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../../item.service';
import { MaterialExterno } from '../../../materialexterno.model';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mod-me-detail',
  templateUrl: './mod-me-detail.page.html',
  styleUrls: ['./mod-me-detail.page.scss'],
})
export class ModMeDetailPage implements OnInit {
  loadedMaterialExterno: MaterialExterno = {
    id: 0,
    iduser: 0,
    nombre: '',
    precio: 0,
    unidades_disp: 0,
    unidades: 0,
    marca: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    public toastController: ToastController,
    private router: Router,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {

  }

  // Función que carga la lista de materiales externos
  ionViewWillEnter() {
    console.log('DETALLES DEL MATERIAL');
    let materialexternoId = '';
    this.activatedRoute.paramMap.subscribe(paramMap => { // Obtener información de la ruta activada (segmento url dinámico).
      if (!paramMap.has('materialexternoId')) {
        this.router.navigate(['/mod-me']); // Redireccionar a la página anterior
      }
      materialexternoId = paramMap.get('materialexternoId'); // Asignar el objeto correspondiente del id del url
    });

    this.itemService.getMaterialExterno(Number(materialexternoId)).subscribe((res) => {
      if (res) {
      this.loadedMaterialExterno = res.data;
      }
  });
  }

  // Función auxiliar. Crea el toast y lo muestra (con el mensaje recibido a través del input)
  async onToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

  // Función que modifica un material externo y luego redirecciona a la página anterior
  OnModicarMaterialExterno(form) {
    // Los datos de los inputs son correctos
    this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Deseas modificar el material externo?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Modificar',
        handler: () => {
          const cloneObject = Object.assign({}, this.loadedMaterialExterno);
          this.itemService.modicarMaterialExterno(cloneObject, form.value).subscribe((res) => {
            if (res.data.nombre) { // Si existe
              this.loadedMaterialExterno.nombre = res.data.nombre;
              this.loadedMaterialExterno.marca = res.data.marca;
              this.loadedMaterialExterno.precio = res.data.precio;
              this.loadedMaterialExterno.unidades_disp = res.data.unidades_disp;
              this.loadedMaterialExterno.unidades = res.data.unidades;
              this.onToast('Operación exitosa!'); // Desplegar mensaje de éxito
              this.router.navigate(['/mod-me']); // Redireccionar a la página anterior
            }
            });
        }
      }]
    }).then(alertElem => {
      alertElem.present();
    });


  }
}
