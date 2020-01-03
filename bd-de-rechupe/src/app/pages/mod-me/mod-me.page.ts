import { Component, OnInit } from '@angular/core';
import { MaterialExterno } from 'src/app/materialexterno.model';
import { ItemService } from 'src/app/item.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-mod-me',
  templateUrl: './mod-me.page.html',
  styleUrls: ['./mod-me.page.scss'],
})
export class ModMePage implements OnInit {
  materialesexternos: MaterialExterno[];
  textoBuscar = '';

  constructor(
    private materialexternoService: ItemService,
    private  authService: AuthService
    ) { }

  ngOnInit() {
      this.authService.getKeyValue('userId').then((iduser) => {
      if (iduser) {
        this.authService.setUserId(iduser);
      }
    });
  }

  // Función que carga la lista de materiales externos
  ionViewDidEnter() {
      const iduser = this.authService.getUserId();
      if (iduser) {
      console.log('UserID: ' + iduser);
      this.materialexternoService.getAllMaterialesExternos(iduser).subscribe((res) => {
        this.materialesexternos = res.data;
        });
    }
  }
  // Función que obtiene el texto introducido en la barra de búsqueda
  search( event ) {
    this.textoBuscar = event.detail.value;
  }

}
