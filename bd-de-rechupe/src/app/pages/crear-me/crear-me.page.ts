import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-crear-me',
  templateUrl: './crear-me.page.html',
  styleUrls: ['./crear-me.page.scss'],
})
export class CrearMePage implements OnInit {

  constructor(
    private itemService: ItemService,
    public toastController: ToastController,
    private router: Router,
    private alertCtrl: AlertController,
    private  authService: AuthService
    ) { }

  ngOnInit() {
    this.authService.getKeyValue('userId').then((iduser) => {
      if (iduser) {
        this.authService.setUserId(iduser);
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

  // Función que crea el material externo y luego redirecciona a la página anterior
  OnCrearMaterialExterno(form) {
    // Los datos de los inputs son correctos
    this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Deseas crear el material externo?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Crear',
        handler: () => {
          const iduser = this.authService.getUserId();
          if (iduser) {
            const obj = {
              form: form.value,
              id: iduser
            };
            console.log('Objeto', obj);
            this.itemService.crearMaterialExterno(obj).subscribe((res) => {
              if (res.data) { // Si existe
                form.reset(); // Limpiar formulario
                this.onToast('Operación exitosa!'); // Desplegar mensaje de éxito
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
