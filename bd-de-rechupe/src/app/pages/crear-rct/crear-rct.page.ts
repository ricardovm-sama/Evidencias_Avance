import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { ItemService } from 'src/app/item.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-rct',
  templateUrl: './crear-rct.page.html',
  styleUrls: ['./crear-rct.page.scss'],
})
export class CrearRctPage implements OnInit {

  rctnombre = '';
  clonerctnombre = '';

  constructor(
    public toastController: ToastController,
    private itemService: ItemService,
    private  authService: AuthService,
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

    // Función que va guardando los inputs del usuario (en distintos arreglos dependiendo del tipo del ítem)
    addNombre(entry: any) {
      const valor = entry.value;
      const pattern = new RegExp('^(?![ .0-9]+$)[a-zA-ZñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ .0-9]{1,}$');

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

      // Función auxiliar. Crea el toast y lo muestra (con el mensaje recibido a través del input)
      async onToast(msj: string, dur: number) {
        const toast = await this.toastController.create({
          message: msj,
          duration: dur
        });
        toast.present();
      }

  // Función que crea la receta
    OnCrearReceta() {
      this.alertCtrl.create({
          header: '¿Estás seguro?',
          message: '¿Deseas crear la receta?',
          buttons: [{
            text: 'Cancelar',
            role: 'cancel'
          }, {
            text: 'Crear',
            handler: () => {
              if (this.clonerctnombre === '') {
                this.onToast('Falta asignar nombre de receta', 2000); // Desplegar mensaje de éxito
                return;
              }
              const iduser = this.authService.getUserId();
              console.log('UserID: ' + iduser);
              if (iduser) {
                this.itemService.crearReceta(iduser, this.clonerctnombre).subscribe((res) => {
                  if (res.data) { // Si existe
                    console.log('receta creada!: ', res.data);
                    this.onToast('Operación exitosa!', 2000); // Desplegar mensaje de éxito
                    this.router.navigate(['/mainmenu']); // Redireccionar a la página anterior
                  }
                });
              }
            }
          }]
        }).then(alertElem => {
          alertElem.present();
      });
    }




}
