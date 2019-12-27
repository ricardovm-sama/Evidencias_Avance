import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainmenuPageRoutingModule } from './mainmenu-routing.module';

import { MainmenuPage } from './mainmenu.page';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainmenuPageRoutingModule
  ],
  declarations: [MainmenuPage]
})
export class MainmenuPageModule {}
