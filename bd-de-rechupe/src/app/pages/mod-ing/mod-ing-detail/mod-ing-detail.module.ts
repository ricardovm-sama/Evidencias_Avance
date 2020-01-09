import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModIngDetailPageRoutingModule } from './mod-ing-detail-routing.module';

import { ModIngDetailPage } from './mod-ing-detail.page';
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
    ModIngDetailPageRoutingModule,
    ModalCheckPageModule
  ],
  declarations: [ModIngDetailPage]
})
export class ModIngDetailPageModule {}
