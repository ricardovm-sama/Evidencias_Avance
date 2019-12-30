import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RealizarPageRoutingModule } from './realizar-routing.module';

import { RealizarPage } from './realizar.page';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { ModalInfoPageModule } from '../modal-info/modal-info.module';

@NgModule({
  entryComponents: [
    ModalInfoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RealizarPageRoutingModule,
    ModalInfoPageModule
  ],
  declarations: [RealizarPage]
})
export class RealizarPageModule {}
