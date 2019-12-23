import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string, propiedad1: string, propiedad2: string): any[] {
    if (texto === '') {
      return arreglo;
    }
    texto = texto.toLowerCase();
    return arreglo.filter( item => {
      return item[propiedad1].toLowerCase().includes(texto);
    }).sort((a, b) => (a[propiedad1] > b[propiedad1]) ? 1 :
    (a[propiedad1] === b[propiedad1]) ? ((a[propiedad2] > b[propiedad2]) ? 1 : -1) : -1 );
  }
//  .sort((a, b) => (a.columna1 > b.columna1) ? 1 : (a.columna1 === b.columna1) ? ((a.columna2 > b.columna2) ? 1 : -1) : -1 );
}
