import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModMePageRoutingModule } from './mod-me-routing.module';

import { ModMePage } from './mod-me.page';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModMePageRoutingModule,
    PipesModule
  ],
  declarations: [ModMePage]
})
export class ModMePageModule {}
