import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrotemping'
})
export class FiltrotempingPipe implements PipeTransform {
  // Función que filtra los ingredientes por temporada
  transform(arreglo: any[], texto: string, temporadas: any[], meses: any[], propiedad1: string, propiedad2: string): any[] {
    if ((typeof(arreglo) === 'undefined' || arreglo.length <= 0)) {
      console.log('Filtro Ingredientes: No hay arreglo');
      return;
    }
    const res = meses.some(elem => { // Ayuda a confirmar si algún mes fue seleccionado
      return elem.selected === true;
    });
    if ((texto === '') &&
      (!res || (typeof(temporadas) === 'undefined' || temporadas.length <= 0))) {
      console.log('Filtro Ingredientes: Sin texto, y sin meses ni temporadas');
      return;
    }
    if ((texto !== '') &&
      (!res || (typeof(temporadas) === 'undefined' || temporadas.length <= 0))) {
      console.log('Filtro Ingredientes: Con texto, y sin meses ni temporadas');
      return;
    }
    const meses2 = meses.filter(elem => { // Obtener arreglo de sólo los meses seleccionados
      return elem.selected === true;
    });
    const mesesnom = meses2.map(elem => elem.nombre); // Obtener arreglo de sólo los nombres de los meses seleccionados
    if ((texto === '') &&
     !(!res || (typeof(temporadas) === 'undefined' || temporadas.length <= 0))) {
      console.log('Filtro Ingredientes: Sin texto, y con meses y temporadas');
      texto = texto.toLowerCase();
      return arreglo.filter( ing => {
        return temporadas.some( reg => {
          return ing.id === reg.idingrediente && mesesnom.includes(reg.temp);
        });
      }).sort((a, b) => (a[propiedad1] > b[propiedad1]) ? 1 :
      (a[propiedad1] === b[propiedad1]) ? ((a[propiedad2] > b[propiedad2]) ? 1 : -1) : -1 );
    }
    if ((texto !== '') &&
     !(!res || (typeof(temporadas) === 'undefined' || temporadas.length <= 0))) {
      console.log('Filtro Ingredientes: Con texto, y con meses y temporadas');
      texto = texto.toLowerCase();
      return arreglo.filter( ing => {
        return temporadas.some( reg => {
          return ing.id === reg.idingrediente && mesesnom.includes(reg.temp) && ing[propiedad1].toLowerCase().includes(texto);
        });
      }).sort((a, b) => (a[propiedad1] > b[propiedad1]) ? 1 :
      (a[propiedad1] === b[propiedad1]) ? ((a[propiedad2] > b[propiedad2]) ? 1 : -1) : -1 );
    }

  }



}
