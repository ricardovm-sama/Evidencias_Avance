import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModRctPageRoutingModule } from './mod-rct-routing.module';

import { ModRctPage } from './mod-rct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModRctPageRoutingModule
  ],
  declarations: [ModRctPage]
})
export class ModRctPageModule {}
