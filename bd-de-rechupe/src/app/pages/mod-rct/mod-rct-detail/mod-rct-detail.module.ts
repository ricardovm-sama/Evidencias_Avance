import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModRctDetailPageRoutingModule } from './mod-rct-detail-routing.module';

import { ModRctDetailPage } from './mod-rct-detail.page';
import { ModalCheckPage } from '../../modal-check/modal-check.page';
import { ModalCheckPageModule } from '../../modal-check/modal-check.module';

@NgModule({
  entryComponents: [
    ModalCheckPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModRctDetailPageRoutingModule,
    ModalCheckPageModule
  ],
  declarations: [ModRctDetailPage]
})
export class ModRctDetailPageModule {}
