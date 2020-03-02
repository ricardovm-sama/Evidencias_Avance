import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../../item.service';
import { MaterialExterno } from '../../../materialexterno.model';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-elim-me-detail',
  templateUrl: './elim-me-detail.page.html',
  styleUrls: ['./elim-me-detail.page.scss'],
})
export class ElimMeDetailPage implements OnInit {
  loadedMaterialExterno: MaterialExterno = {
    id: 0,
    iduser: 0,
    nombre: 'NA',
    precio: 0,
    unidades_disp: 0,
    unidades: 0,
    marca: 'NA'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private  authService: AuthService,
    public toastController: ToastController,
    private router: Router,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.authService.getKeyValue('userId').then((iduser) => {
      if (iduser) {
        this.authService.setUserId(iduser);
      }
    });
  }

  // Función que carga la lista de materiales externos
  ionViewWillEnter() {
    console.log('DETALLES DEL MATERIAL');
    let materialexternoId = '';
    const iduser = this.authService.getUserId();
    if (iduser) { // Si el usuario está en sesión
      console.log('UserID: ' + iduser);
      this.activatedRoute.paramMap.subscribe(paramMap => { // Obtener información de la ruta activada (segmento url dinámico).
        if (!paramMap.has('materialexternoId')) { // No hay item seleccionado
          this.router.navigate(['/elim-me']); // Redireccionar a la página anterior
        }
        materialexternoId = paramMap.get('materialexternoId'); // Asignar el objeto correspondiente del id del url
        this.itemService.getAllMaterialesExternos(iduser).subscribe((res) => { // Obtener todos los items
          if (res) {
            const conjuntoids = res.data.map(elem => elem.id); // Obtener arreglo de sólo los ids de los items del usuario
            if (conjuntoids.includes(Number(materialexternoId))) { // El item pertenece al usuario
              const array = res.data.filter((item) => {
                return item.id === Number(materialexternoId);
              });
              this.loadedMaterialExterno = array[0]; // Asignar item seleccionado
            }
          }
        });
      });
    }

  }

  // Función auxiliar. Crea el toast y lo muestra (con el mensaje recibido a través del input)
  async onToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

  // Función que elimina un material externo y luego redirecciona a la página anterior
  OnEliminarMaterialExterno() {
    this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Deseas eliminar el material externo?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Eliminar',
        handler: () => {
          this.itemService.eliminarMaterialExterno(this.loadedMaterialExterno.id).subscribe((res) => {
            if (res.data) { // Si existe
              this.onToast('Operación exitosa!'); // Desplegar mensaje de éxito
              this.router.navigate(['/elim-me']); // Redireccionar a la página anterior
            }
            });
        }
      }]
    }).then(alertElem => {
      alertElem.present();
    });


  }

}
