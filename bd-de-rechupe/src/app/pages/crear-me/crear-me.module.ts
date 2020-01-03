import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearMePageRoutingModule } from './crear-me-routing.module';

import { CrearMePage } from './crear-me.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearMePageRoutingModule
  ],
  declarations: [CrearMePage]
})
export class CrearMePageModule {}
