import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-materialexterno',
  templateUrl: './materialexterno.page.html',
  styleUrls: ['./materialexterno.page.scss'],
})
export class MaterialexternoPage implements OnInit {
/*  <ion-icon name="color-wand"></ion-icon>
  <ion-icon name="thumbs-down"></ion-icon> */
  pages = [
    {
      title: 'Modificar',
      icon: 'thumbs-up',
      url: '/mod-me'
    }
  ];
  constructor(
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private  authService: AuthService,
    private router: Router
     ) {}

  ngOnInit() {
  }

/*  toggleMenu() {
    this.menuCtrl.toggle();
  } */

  onCerrarSesion() {
    this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Deseas cerrar sesión?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Cerrar Sesión',
        handler: () => {
          this.authService.cerrarSesion();
          this.router.navigate(['/ingreso']);
        }
      }]
    }).then(alertElem => {
      alertElem.present();
    });
  }

}
