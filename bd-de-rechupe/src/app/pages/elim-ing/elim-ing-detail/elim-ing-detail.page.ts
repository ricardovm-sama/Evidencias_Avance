import { Component, OnInit } from '@angular/core';
import { Ingrediente } from 'src/app/ingrediente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-elim-ing-detail',
  templateUrl: './elim-ing-detail.page.html',
  styleUrls: ['./elim-ing-detail.page.scss'],
})
export class ElimIngDetailPage implements OnInit {
  loadedIngrediente: Ingrediente = {
    id: 0,
    iduser: 0,
    nombre: 'NA',
    precio: 0,
    peso: 0.00,
    peso_disp: 0.00,
    energia: 0.00,
    proteina: 0.00,
    grasa: 0.00,
    carbohidratos: 0.00,
    fibra: 0.00,
    colesterol: 0.00,
    sodio: 0.00
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

  // Función que carga la lista de ingredientes
  ionViewWillEnter() {
    console.log('DETALLES DEL INGREDIENTE');
    let ingredienteId = '';
    const iduser = this.authService.getUserId();
    if (iduser) { // Si el usuario está en sesión
      console.log('UserID: ' + iduser);
      this.activatedRoute.paramMap.subscribe(paramMap => { // Obtener información de la ruta activada (segmento url dinámico).
        if (!paramMap.has('ingredienteId')) { // No hay item seleccionado
          this.router.navigate(['/elim-ing']); // Redireccionar a la página anterior
        }
        ingredienteId = paramMap.get('ingredienteId'); // Asignar el objeto correspondiente del id del url
        this.itemService.getAllIngredientes(iduser).subscribe((res) => { // Obtener todos los items
          if (res) {
            const conjuntoids = res.data.map(elem => elem.id); // Obtener arreglo de sólo los ids de los items del usuario
            if (conjuntoids.includes(Number(ingredienteId))) { // El item pertenece al usuario
              const array = res.data.filter((item) => {
                return item.id === Number(ingredienteId);
              });
              this.loadedIngrediente = array[0]; // Asignar item seleccionado
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

  // Función que elimina un ingrediente y luego redirecciona a la página anterior
  OnEliminarIngrediente() {
    this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Deseas eliminar el ingrediente?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Eliminar',
        handler: () => {
          this.itemService.eliminarIngrediente(this.loadedIngrediente.id).subscribe((res) => {
            if (res.data) { // Si existe
              this.onToast('Operación exitosa!'); // Desplegar mensaje de éxito
              this.router.navigate(['/elim-ing']); // Redireccionar a la página anterior
            }
            });
        }
      }]
    }).then(alertElem => {
      alertElem.present();
    });


  }

}
