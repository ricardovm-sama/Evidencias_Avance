import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(
    public toastController: ToastController,
    private  authService: AuthService,
    private router: Router
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

  // Función que inicia el proceso para registrar un usuario en la bd
  onRegistrarUsuario(form) {
    this.authService.registrarUsuario(form.value).subscribe((res) => {
    this.onToast('Operación exitosa!'); // Desplegar mensaje de éxito
    this.router.navigate(['/mod-me']); // CAMBIAR PARA NAVEGAR A PAGINA PRINCIPAL
    });
  }
}
