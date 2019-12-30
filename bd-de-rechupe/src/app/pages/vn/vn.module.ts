import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VnPageRoutingModule } from './vn-routing.module';

import { VnPage } from './vn.page';
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
    VnPageRoutingModule,
    ModalInfoPageModule
  ],
  declarations: [VnPage]
})
export class VnPageModule {}
