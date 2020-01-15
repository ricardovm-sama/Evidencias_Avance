import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  passwordType1: string = 'password';
  passwordIcon1: string = 'eye-off';

  constructor(
    public toastController: ToastController,
    private  authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // Función que redirecciona a registro
  irRegistro() {
    this.router.navigate(['/registro']);
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

  // Función que inicia el proceso para iniciar sesión de usuario en la bd
  onIngresar(form) {
    this.authService.iniciarSesion(form.value).subscribe((res) => {
      this.onToast('Operación exitosa!'); // Desplegar mensaje de éxito
      this.router.navigate(['/mainmenu']); // NAVEGAR A PAGINA PRINCIPAL
    });
  }

}
