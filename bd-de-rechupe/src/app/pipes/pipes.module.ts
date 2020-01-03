import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { FiltrotempingPipe } from './filtrotemping.pipe';
import { FiltrotemprctPipe } from './filtrotemprct.pipe';



@NgModule({
  declarations: [FiltroPipe, FiltrotempingPipe, FiltrotemprctPipe],
  exports: [ FiltroPipe, FiltrotempingPipe, FiltrotemprctPipe ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
