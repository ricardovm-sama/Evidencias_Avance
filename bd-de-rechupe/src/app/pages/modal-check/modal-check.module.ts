import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCheckPageRoutingModule } from './modal-check-routing.module';

import { ModalCheckPage } from './modal-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [ModalCheckPage]
})
export class ModalCheckPageModule {}
