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

  // Función auxiliar. Crea el toast y lo muestra (con el mensaje recibido a través del input)
  async onToast(msj: string, num: number) {
    const toast = await this.toastController.create({
      message: msj,
      duration: num
    });
    toast.present();
  }

  // Función que crea la receta
    OnCrearReceta(form) {
      this.alertCtrl.create({
          header: '¿Estás seguro?',
          message: '¿Deseas crear la receta?',
          buttons: [{
            text: 'Cancelar',
            role: 'cancel'
          }, {
            text: 'Crear',
            handler: () => {
              const iduser = this.authService.getUserId();
              console.log('UserID: ' + iduser);
              if (iduser) {
                this.itemService.crearReceta(iduser, form.value.nombre).subscribe((res) => {
                  if (res.data) { // Si existe
                    form.reset(); // Limpiar formulario
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
