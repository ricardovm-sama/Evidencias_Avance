import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModIngPageRoutingModule } from './mod-ing-routing.module';

import { ModIngPage } from './mod-ing.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModIngPageRoutingModule,
    PipesModule
  ],
  declarations: [ModIngPage]
})
export class ModIngPageModule {}
