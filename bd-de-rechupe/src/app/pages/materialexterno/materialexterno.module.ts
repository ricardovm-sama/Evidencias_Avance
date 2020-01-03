import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialexternoPageRoutingModule } from './materialexterno-routing.module';

import { MaterialexternoPage } from './materialexterno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialexternoPageRoutingModule
  ],
  declarations: [MaterialexternoPage]
})
export class MaterialexternoPageModule {}
