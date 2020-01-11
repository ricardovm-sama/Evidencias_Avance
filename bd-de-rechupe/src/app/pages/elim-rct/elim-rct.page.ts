import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/app/receta.model';
import { ItemService } from 'src/app/item.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-elim-rct',
  templateUrl: './elim-rct.page.html',
  styleUrls: ['./elim-rct.page.scss'],
})
export class ElimRctPage implements OnInit {
  recetas: Receta[];
  textoBuscar = '';

  constructor(
    private itemService: ItemService,
    private  authService: AuthService
    ) { }

  ngOnInit() {
      this.authService.getKeyValue('userId').then((iduser) => {
      if (iduser) {
        this.authService.setUserId(iduser);
      }
    });
  }

  // Función que carga la lista de recetas
  ionViewDidEnter() {
      const iduser = this.authService.getUserId();
      if (iduser) {
      console.log('UserID: ' + iduser);
      this.itemService.getAllRecetas(iduser).subscribe((res) => {
        this.recetas = res.data;
        });
    }
  }
  // Función que obtiene el texto introducido en la barra de búsqueda
  search( event ) {
    this.textoBuscar = event.detail.value;
  }

}
