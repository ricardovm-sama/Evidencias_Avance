import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.page.html',
  styleUrls: ['./mainmenu.page.scss'],
})
export class MainmenuPage implements OnInit {

  pages = [
    {
      title: 'Costos',
      icon: 'cash',
      url: '/costo'
    },
    {
      title: 'Valor Nutricional',
      icon: 'clipboard',
      url: '/vn'
    },
    {
      title: 'Realicemos',
      icon: 'restaurant',
      url: '/realizar'
    },
    {
      title: 'De Temporada',
      icon: 'flag',
      url: '/temporada'
    },
    {
      title: 'Recetas',
      open: false,
      children: [
        {
          title: 'Crear',
          icon: 'color-wand',
          url: '/crear-rct'
        },
        {
          title: 'Modificar',
          icon: 'thumbs-up',
          url: '/mod-rct'
        },
        {
          title: 'Eliminar',
          icon: 'thumbs-down',
          url: '/elim-rct'
        }
      ]
    },
    {
      title: 'Ingredientes',
      open: false,
      children: [
        {
          title: 'Crear',
          icon: 'color-wand',
          url: '/crear-ing'
        },
        {
          title: 'Modificar',
          icon: 'thumbs-up',
          url: '/mod-ing'
        },
        {
          title: 'Eliminar',
          icon: 'thumbs-down',
          url: '/elim-ing'
        }
      ]
    },
    {
      title: 'Materiales Externos',
      open: false,
      children: [
        {
          title: 'Crear',
          icon: 'color-wand',
          url: '/crear-me'
        },
        {
          title: 'Modificar',
          icon: 'thumbs-up',
          url: '/mod-me'
        },
        {
          title: 'Eliminar',
          icon: 'thumbs-down',
          url: '/elim-me'
        }
      ]
    }
  ];

 // selectedPath = '';

  constructor(
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private  authService: AuthService,
    private router: Router
     ) {}

 /* constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }*/

  ngOnInit() {
  }

  toggleMenu() {
    this.menuCtrl.enable(true);
    this.menuCtrl.toggle();
  }

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
