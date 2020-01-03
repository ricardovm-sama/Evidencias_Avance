import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrotemping'
})
export class FiltrotempingPipe implements PipeTransform {
  // Filtra los ingredientes por temporada
  transform(arreglo: any[], texto: string, temporadas: any[], meses: any[], propiedad1: string, propiedad2: string): any[] {
    if ((typeof(arreglo) === 'undefined' || arreglo.length <= 0)) {
      console.log('No hay arreglo');
      return;
    }
    if ((texto === '') && ((typeof(meses) === 'undefined' || meses.length <= 0)
    || (typeof(temporadas) === 'undefined' || temporadas.length <= 0))) {
      console.log('Sin texto, y sin meses ni temporadas');
      return arreglo;
    }
    if ((texto !== '') && ((typeof(meses) === 'undefined' || meses.length <= 0)
     || (typeof(temporadas) === 'undefined' || temporadas.length <= 0))) {
      console.log('Con texto, y sin meses ni temporadas');
      texto = texto.toLowerCase();
      return arreglo.filter( item => {
        return item[propiedad1].toLowerCase().includes(texto);
      }).sort((a, b) => (a[propiedad1] > b[propiedad1]) ? 1 :
      (a[propiedad1] === b[propiedad1]) ? ((a[propiedad2] > b[propiedad2]) ? 1 : -1) : -1 );
    }
    if ((texto === '') && !((typeof(meses) === 'undefined' || meses.length <= 0)
     || (typeof(temporadas) === 'undefined' || temporadas.length <= 0))) {
      console.log('Sin texto, y con meses y temporadas');
      texto = texto.toLowerCase();
      return arreglo.filter( ing => {
        return temporadas.some( reg => {
          return ing.id === reg.idingrediente && meses.includes(reg.temp);
        });
      }).sort((a, b) => (a[propiedad1] > b[propiedad1]) ? 1 :
      (a[propiedad1] === b[propiedad1]) ? ((a[propiedad2] > b[propiedad2]) ? 1 : -1) : -1 );
    }
    if ((texto !== '') && !((typeof(meses) === 'undefined' || meses.length <= 0)
     || (typeof(temporadas) === 'undefined' || temporadas.length <= 0))) {
      console.log('Con texto, y con meses y temporadas');
      texto = texto.toLowerCase();
      return arreglo.filter( ing => {
        return temporadas.some( reg => {
          return ing.id === reg.idingrediente && meses.includes(reg.temp) && ing[propiedad1].toLowerCase().includes(texto);
        });
      }).sort((a, b) => (a[propiedad1] > b[propiedad1]) ? 1 :
      (a[propiedad1] === b[propiedad1]) ? ((a[propiedad2] > b[propiedad2]) ? 1 : -1) : -1 );
    }

  }



}
