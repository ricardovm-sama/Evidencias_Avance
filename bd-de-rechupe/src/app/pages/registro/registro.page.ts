import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  passwordType1 = 'password';
  passwordType2 = 'password';
  passwordIcon1 = 'eye-off';
  passwordIcon2 = 'eye-off';

  constructor(
    public toastController: ToastController,
    private  authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  // Función que crea el toast y lo muestra (con el mensaje recibido a través del input)
  async onToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

  // Función que esconde y muestra password del primer campo
   onMostrarEsconderPassword1() {
     this.passwordType1 = (this.passwordType1 === 'text' ? 'password' : 'text');
     this.passwordIcon1 = (this.passwordIcon1 === 'eye-off' ? 'eye' : 'eye-off');
   }

  // Función que esconde y muestra password del segundo campo
   onMostrarEsconderPassword2() {
     this.passwordType2 = (this.passwordType2 === 'text' ? 'password' : 'text');
     this.passwordIcon2 = (this.passwordIcon2 === 'eye-off' ? 'eye' : 'eye-off');
   }

  // Función que inicia el proceso para registrar un usuario en la bd
  onRegistrarUsuario(form) {
    const password = form.value.password;
    const confirm = form.value.confirm;
    if (password !== confirm) {
      this.onToast('Las 2 contraseñas no coinciden'); // Desplegar mensaje de éxito
      return;
    }
    this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Deseas registrar el usuario?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Registrar',
        handler: () => {
          this.authService.registrarUsuario(form.value).subscribe((res) => {
            this.onToast('Operación exitosa!'); // Desplegar mensaje de éxito
            this.router.navigate(['/mainmenu']); // NAVEGAR A PAGINA PRINCIPAL
          });
        }
      }]
    }).then(alertElem => {
      alertElem.present();
  });

  }


}
