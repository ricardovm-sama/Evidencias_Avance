import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearRctPageRoutingModule } from './crear-rct-routing.module';

import { CrearRctPage } from './crear-rct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearRctPageRoutingModule
  ],
  declarations: [CrearRctPage]
})
export class CrearRctPageModule {}
