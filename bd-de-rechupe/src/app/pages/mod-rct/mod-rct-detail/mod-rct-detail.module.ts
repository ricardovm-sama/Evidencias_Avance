import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModRctDetailPageRoutingModule } from './mod-rct-detail-routing.module';

import { ModRctDetailPage } from './mod-rct-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModRctDetailPageRoutingModule
  ],
  declarations: [ModRctDetailPage]
})
export class ModRctDetailPageModule {}
