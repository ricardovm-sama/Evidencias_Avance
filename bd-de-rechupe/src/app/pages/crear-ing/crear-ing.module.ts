import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearIngPageRoutingModule } from './crear-ing-routing.module';

import { CrearIngPage } from './crear-ing.page';
import { ModalCheckPage } from '../modal-check/modal-check.page';
import { ModalCheckPageModule } from '../modal-check/modal-check.module';

@NgModule({
  entryComponents: [
    ModalCheckPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearIngPageRoutingModule,
    ModalCheckPageModule
  ],
  declarations: [CrearIngPage]
})
export class CrearIngPageModule {}
