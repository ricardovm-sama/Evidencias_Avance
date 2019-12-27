import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModMeDetailPageRoutingModule } from './mod-me-detail-routing.module';

import { ModMeDetailPage } from './mod-me-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModMeDetailPageRoutingModule
  ],
  declarations: [ModMeDetailPage]
})
export class ModMeDetailPageModule {}
