import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrotemprct'
})
// AGREGAR FUNCION RECURSIVA PARA LAS RECETAS (OBTENER SI LA RECETA ESTA DISPONIBLE)
export class FiltrotemprctPipe implements PipeTransform {
  // Filtra las recetas por temporada
  transform(arreglo: any[], texto: string, rctsings: any[], temporadas: any[], meses: any[],
            propiedad1: string, propiedad2: string): any[] {
    if ((typeof(arreglo) === 'undefined' || arreglo.length <= 0)) {
      return;
    }
    if ((texto === '') && ((typeof(meses) === 'undefined' || meses.length <= 0)
    || (typeof(temporadas) === 'undefined' || temporadas.length <= 0) || (typeof(rctsings) === 'undefined' || rctsings.length <= 0))) {
      return arreglo;
    }
    if ((texto !== '') && ((typeof(meses) === 'undefined' || meses.length <= 0)
    || (typeof(temporadas) === 'undefined' || temporadas.length <= 0) || (typeof(rctsings) === 'undefined' || rctsings.length <= 0))) {
      texto = texto.toLowerCase();
      return arreglo.filter( item => {
        return item[propiedad1].toLowerCase().includes(texto);
      }).sort((a, b) => (a[propiedad1] > b[propiedad1]) ? 1 :
      (a[propiedad1] === b[propiedad1]) ? ((a[propiedad2] > b[propiedad2]) ? 1 : -1) : -1 );
    }
    if ((texto === '') && !((typeof(meses) === 'undefined' || meses.length <= 0)
    || (typeof(temporadas) === 'undefined' || temporadas.length <= 0) || (typeof(rctsings) === 'undefined' || rctsings.length <= 0))) {
      texto = texto.toLowerCase();
      return arreglo.filter( rct => { // Filtrar array de recetas
              return rctsings.some((rctitem) => { // Buscar receta relacionada con algún ingrediente (del usuario)
                return (rctitem.idreceta === rct.id) && temporadas.some( reg => {
                  return (rctitem.idingrediente === reg.idingrediente) && (meses.includes(reg.temp));
                });
              });
      }).sort((a, b) => (a[propiedad1] > b[propiedad1]) ? 1 :
      (a[propiedad1] === b[propiedad1]) ? ((a[propiedad2] > b[propiedad2]) ? 1 : -1) : -1 );
    }
    if ((texto !== '') && !((typeof(meses) === 'undefined' || meses.length <= 0)
    || (typeof(temporadas) === 'undefined' || temporadas.length <= 0) || (typeof(rctsings) === 'undefined' || rctsings.length <= 0))) {
      texto = texto.toLowerCase();
      return arreglo.filter( rct => { // Filtrar array de recetas
              return rctsings.some((rctitem) => { // Buscar receta relacionada con algún ingrediente (del usuario)
                return (rctitem.idreceta === rct.id) && temporadas.some( reg => {
                  return rctitem.idingrediente === reg.idingrediente && meses.includes(reg.temp)
                  && rct[propiedad1].toLowerCase().includes(texto);
                });
              });
      }).sort((a, b) => (a[propiedad1] > b[propiedad1]) ? 1 :
      (a[propiedad1] === b[propiedad1]) ? ((a[propiedad2] > b[propiedad2]) ? 1 : -1) : -1 );
    }


  }




}
