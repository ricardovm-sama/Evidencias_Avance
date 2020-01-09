import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElimMePageRoutingModule } from './elim-me-routing.module';

import { ElimMePage } from './elim-me.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElimMePageRoutingModule,
    PipesModule
  ],
  declarations: [ElimMePage]
})
export class ElimMePageModule {}
