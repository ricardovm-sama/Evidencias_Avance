import { Component, OnInit } from '@angular/core';
import { Ingrediente } from 'src/app/ingrediente.model';
import { ItemService } from 'src/app/item.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-elim-ing',
  templateUrl: './elim-ing.page.html',
  styleUrls: ['./elim-ing.page.scss'],
})
export class ElimIngPage implements OnInit {
  ingredientes: Ingrediente[];
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

  // Función que carga la lista de ingredientes
  ionViewDidEnter() {
      const iduser = this.authService.getUserId();
      if (iduser) {
      console.log('UserID: ' + iduser);
      this.itemService.getAllIngredientes(iduser).subscribe((res) => {
        if (res) {
          this.ingredientes = res.data;
        }
        });
    }
  }
  // Función que obtiene el texto introducido en la barra de búsqueda
  search( event ) {
    this.textoBuscar = event.detail.value;
  }

}
