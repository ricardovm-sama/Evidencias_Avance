import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElimRctDetailPageRoutingModule } from './elim-rct-detail-routing.module';

import { ElimRctDetailPage } from './elim-rct-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElimRctDetailPageRoutingModule
  ],
  declarations: [ElimRctDetailPage]
})
export class ElimRctDetailPageModule {}
