import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { MaterialExterno } from 'src/app/materialexterno.model';
import { Ingrediente } from 'src/app/ingrediente.model';
import { Receta } from 'src/app/receta.model';
import { ItemService } from 'src/app/item.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-elim-rct-detail',
  templateUrl: './elim-rct-detail.page.html',
  styleUrls: ['./elim-rct-detail.page.scss'],
})
export class ElimRctDetailPage implements OnInit {
materialesexternos: MaterialExterno[] = [];
ingredientes: Ingrediente[] = [];
recetas: Receta[] = [];

rctsrcts: any[] = [];
rctsings: any[] = [];
rctsmtes: any[] = [];

rctrcts: any[] = [];
rctings: any[] = [];
rctmtes: any[] = [];

clonerctrcts: any[] = [];
clonerctings: any[] = [];
clonerctmtes: any[] = [];

rctnombre = '';
clonerctnombre = '';
recetaId = '';

constructor(
  public toastController: ToastController,
  private itemService: ItemService,
  private  authService: AuthService,
  private router: Router,
  private alertCtrl: AlertController,
  private activatedRoute: ActivatedRoute
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
    let recetaId = '';
    if (iduser) {
      console.log('UserID: ' + iduser);
      this.activatedRoute.paramMap.subscribe(paramMap => { // Obtener información de la ruta activada (segmento url dinámico).
        if (!paramMap.has('recetaId')) {
          this.router.navigate(['/elim-rct']); // Redireccionar a la página anterior
        }
        recetaId = paramMap.get('recetaId'); // Asignar el objeto correspondiente del id del url
      });
      if (recetaId !== '') {
        console.log('RECETAID: ', recetaId);
        this.recetaId = recetaId;
        this.itemService.getAllMaterialesExternos(iduser).subscribe((res) => { // Obtener materiales externos
        if (res) {
        this.materialesexternos = res.data;
        }
        });
        this.itemService.getAllIngredientes(iduser).subscribe((res) => { // Obtener ingredientes
        if (res) {
        this.ingredientes = res.data;
        }
        });
        this.itemService.getAllRecetas(iduser).subscribe((res) => { // Obtener recetas
        if (res) {
        this.recetas = res.data;
        let rctnom = [];
        rctnom = res.data.filter( el => el.id === Number(recetaId)); // Obtener la entrada de la receta principal
        const clonerctnom = JSON.parse(JSON.stringify(rctnom)); // clonar arreglo
        this.rctnombre = clonerctnom[0].nombre; // Obtener el nombre de la receta principal
        this.clonerctnombre = this.rctnombre;
        }
        });
        this.itemService.getRecetasRecetas(iduser).subscribe((res) => { // Obtener recetas_recetas
        if (res) {
          this.rctsrcts = res.data;
          this.rctrcts = res.data.filter((elem) => { // Obtener subrecetas
            return elem.iduser === iduser && elem.idreceta === Number(recetaId);
          });
          this.rctrcts.forEach((elem) => { // Agregar las propiedades nombre de subreceta y selected
            this.recetas.forEach((rct) => {
              if (rct.id === elem.idsubreceta) {
                elem.nombre = rct.nombre;
                elem.selected = false;
              }
            });
          });
          this.clonerctrcts = JSON.parse(JSON.stringify(this.rctrcts)); // clonar arreglo
        }
        });
        this.itemService.getRecetasIngredientes(iduser).subscribe((res) => { // Obtener recetas_ingredientes
        if (res) {
        this.rctsings = res.data;
        this.rctings = res.data.filter((elem) => { // Obtener subingredientes
            return elem.iduser === iduser && elem.idreceta === Number(recetaId);
          });
        this.rctings.forEach((elem) => { // Agregar las propiedades nombre de subingrediente y selected
            this.ingredientes.forEach((ing) => {
              if (ing.id === elem.idingrediente) {
                elem.nombre = ing.nombre;
                elem.selected = false;
              }
            });
          });
        this.clonerctings = JSON.parse(JSON.stringify(this.rctings)); // clonar arreglo
        }
        });
        this.itemService.getRecetasMaterialesExternos(iduser).subscribe((res) => { // Obtener recetas_materialesexternos
        if (res) {
        this.rctsmtes = res.data;
        this.rctmtes = res.data.filter((elem) => { // Obtener submaterialesexternos
            return elem.iduser === iduser && elem.idreceta === Number(recetaId);
          });
        this.rctmtes.forEach((elem) => { // Agregar las propiedades nombre de submaterialesexternos y selected
            this.materialesexternos.forEach((mte) => {
              if (mte.id === elem.idmaterialexterno) {
                elem.nombre = mte.nombre;
                elem.selected = false;
              }
            });
          });
        this.clonerctmtes = JSON.parse(JSON.stringify(this.rctmtes)); // clonar arreglo
        }
        });
      }
    }
  }

    // Función auxiliar. Crea el toast y lo muestra (con el mensaje recibido a través del input)
    async onToast(msj: string, dur: number) {
      const toast = await this.toastController.create({
        message: msj,
        duration: dur
      });
      toast.present();
    }

// Función que elimina la receta y luego redirecciona a la página anterior
  OnEliminarReceta() {
    this.alertCtrl.create({
        header: '¿Estás seguro?',
        message: '¿Deseas eliminar la receta?',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          handler: () => {
            this.itemService.eliminarReceta(Number(this.recetaId)).subscribe((res) => {
              if (res.data) { // Si existe
                console.log('receta eliminada!: ', res.data);
                this.onToast('Operación exitosa!', 2000); // Desplegar mensaje de éxito
                this.router.navigate(['/elim-rct']); // Redireccionar a la página anterior
              }
            });
          }
        }]
      }).then(alertElem => {
        alertElem.present();
    });
  }





}
