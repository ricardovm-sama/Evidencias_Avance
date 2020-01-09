import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElimMeDetailPageRoutingModule } from './elim-me-detail-routing.module';

import { ElimMeDetailPage } from './elim-me-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElimMeDetailPageRoutingModule
  ],
  declarations: [ElimMeDetailPage]
})
export class ElimMeDetailPageModule {}
