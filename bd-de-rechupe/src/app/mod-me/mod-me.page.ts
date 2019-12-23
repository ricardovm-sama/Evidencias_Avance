import { Component, OnInit } from '@angular/core';
import { MaterialExterno } from '../materialexterno.model';
import { MaterialexternoService } from '../materialexterno.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mod-me',
  templateUrl: './mod-me.page.html',
  styleUrls: ['./mod-me.page.scss'],
})
export class ModMePage implements OnInit {
  materialesexternos: MaterialExterno[];
  textoBuscar = '';

  constructor(
    private materialexternoService: MaterialexternoService,
    private  authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  // Función que carga la lista de materiales externos
  ionViewWillEnter() {
/*    this.authService.getKeyValue('userId').then(result => {
      if (result != null) {
      console.log('UserID: ' + result);
      this.materialexternoService.getAllMaterialesExternos(result).subscribe((res) => {
        this.materialesexternos = res.data;
        });
      }
      }).catch(e => {
      console.log('error: ' + e);
      // Handle errors here
      });
*/
    const iduser = this.authService.getUserId();
    if (iduser) {
      console.log('UserID: ' + iduser);
      this.materialexternoService.getAllMaterialesExternos(iduser).subscribe((res) => {
        this.materialesexternos = res.data;
        });
    }

  }

  search( event ) {
    // console.log(event);
    this.textoBuscar = event.detail.value;
  }

}
