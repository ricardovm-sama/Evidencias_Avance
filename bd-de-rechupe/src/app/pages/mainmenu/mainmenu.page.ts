import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { MenuController } from '@ionic/angular';

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
    }
  ];

 // selectedPath = '';

  constructor( private menuCtrl: MenuController ) {}

 /* constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }*/

  ngOnInit() {
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

}
