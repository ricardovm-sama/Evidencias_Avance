import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../../item.service';
import { MaterialExterno } from '../../../materialexterno.model';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-mod-me-detail',
  templateUrl: './mod-me-detail.page.html',
  styleUrls: ['./mod-me-detail.page.scss'],
})
export class ModMeDetailPage implements OnInit {
  loadedMaterialExterno: MaterialExterno = {
    id: 0,
    iduser: 0,
    nombre: '',
    precio: 0,
    unidades_disp: 0,
    unidades: 0,
    marca: ''
  };

  inputmodmenombre = '';
  inputmodmemarca = '';
  inputmodmeprecio = '';
  inputmodmeunidadesdisp = '';
  inputmodmeunidades = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private materialexternoService: ItemService,
    public toastController: ToastController,
    private  authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
    ) { }

// Función que carga la lista de materiales externos
  ngOnInit() {

  }

  ionViewWillEnter() {
    console.log('DETALLES DEL MATERIAL');
    let materialexternoId = '';
    this.activatedRoute.paramMap.subscribe(paramMap => { // Obtener información de la ruta activada (segmento url dinámico).
      if (!paramMap.has('materialexternoId')) {
        this.router.navigate(['/mod-me']); // Redireccionar a la página anterior
      }
      materialexternoId = paramMap.get('materialexternoId'); // Asignar el objeto correspondiente del id del url
    });

    this.materialexternoService.getMaterialExterno(Number(materialexternoId)).subscribe((res) => {
      if (res) {
      this.loadedMaterialExterno = res.data;
      }
  });
  }

  // Función auxiliar. Crea el toast y lo muestra (con el mensaje recibido a través del input)
  async onToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

  // Función que modifica un material externo y luego redirecciona a la página anterior
  OnModicarMaterialExterno() {
    const patternNombre = new RegExp('^(?![\s.0-9]+$)[a-zA-Z\s.0-9].{1,31}$');
    const patternMarca = new RegExp('^(?![\s]+$)[a-zA-Z\s.0-9$!%?&].{1,31}$');
    const patternUnidades = new RegExp('^(([1-9]{1}[0-9]{0,})|([0]{1}))$');
    // const patternPeso = new RegExp('^(([1-9]{1}[0-9]{0,})|([0]{1}))[.]{1}[0-9]{2}$');

    if (this.inputmodmenombre === '' && this.inputmodmemarca === '' && this.inputmodmeprecio === '' &&
     this.inputmodmeunidadesdisp === '' && this.inputmodmeunidades === '') {
      this.onToast('No se ha ingresado ningún valor');
      return;
    }
    if (this.inputmodmenombre !== '' && !patternNombre.test(this.inputmodmenombre)) {
      this.onToast('El nombre no es válido');
      return;
    }
    if (this.inputmodmemarca !== '' && !patternMarca.test(this.inputmodmemarca)) {
      this.onToast('La marca no es válida');
      return;
    }
    if (this.inputmodmeprecio !== '' && !patternUnidades.test(this.inputmodmeprecio)) {
      this.onToast('El precio de referencia no es válido');
      return;
    }
    if (this.inputmodmeunidadesdisp !== '' && !patternUnidades.test(this.inputmodmeunidadesdisp)) {
      this.onToast('Las unidades disponibles no son válidas');
      return;
    }
    if (this.inputmodmeunidades !== '' && !patternUnidades.test(this.inputmodmeunidades)) {
      this.onToast('Las unidades de referencia no son válidas');
      return;
    }
    // Los datos de los inputs son correctos
    this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Deseas modificar el material externo?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Modificar',
        handler: () => {
          const cloneObject = Object.assign({}, this.loadedMaterialExterno);
          this.materialexternoService.modicarMaterialExterno(cloneObject, this.inputmodmenombre,
          this.inputmodmemarca, this.inputmodmeprecio, this.inputmodmeunidadesdisp, this.inputmodmeunidades).subscribe((res) => {
            if (res.data.nombre) { // Si existe
              this.loadedMaterialExterno.nombre = res.data.nombre;
              this.loadedMaterialExterno.marca = res.data.marca;
              this.loadedMaterialExterno.precio = res.data.precio;
              this.loadedMaterialExterno.unidades_disp = res.data.unidades_disp;
              this.loadedMaterialExterno.unidades = res.data.unidades;
              this.onToast('Operación exitosa!'); // Desplegar mensaje de éxito
              this.router.navigate(['/mod-me']); // Redireccionar a la página anterior
            }
            });
        }
      }]
    }).then(alertElem => {
      alertElem.present();
    });


  }
}
