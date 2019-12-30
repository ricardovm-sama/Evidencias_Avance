import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostoPageRoutingModule } from './costo-routing.module';

import { CostoPage } from './costo.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
// import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
// import { ComponentsModule } from 'src/app/components/components.module';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { ModalInfoPageModule } from '../modal-info/modal-info.module';

@NgModule({
  entryComponents: [
//    PopinfoComponent,
    ModalInfoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CostoPageRoutingModule,
    PipesModule,
//    ComponentsModule,
    ModalInfoPageModule
  ],
  declarations: [CostoPage]
})
export class CostoPageModule {}
