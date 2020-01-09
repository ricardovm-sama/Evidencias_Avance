import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElimIngDetailPageRoutingModule } from './elim-ing-detail-routing.module';

import { ElimIngDetailPage } from './elim-ing-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElimIngDetailPageRoutingModule
  ],
  declarations: [ElimIngDetailPage]
})
export class ElimIngDetailPageModule {}
