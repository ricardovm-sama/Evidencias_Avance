import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElimIngPageRoutingModule } from './elim-ing-routing.module';

import { ElimIngPage } from './elim-ing.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElimIngPageRoutingModule,
    PipesModule
  ],
  declarations: [ElimIngPage]
})
export class ElimIngPageModule {}
