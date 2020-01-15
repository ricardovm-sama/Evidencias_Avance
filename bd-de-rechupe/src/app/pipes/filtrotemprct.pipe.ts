import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrotemprct'
})

export class FiltrotemprctPipe implements PipeTransform {

  // Función recursiva que determina si las subrecetas contienen ingredientes no disponibles en un conjunto de meses
  sinDisponibilidad(suma: number, subrecetaId: number, rctsrcts: any, rctsings: any, temporadas: any, mesesnom: any) {
    console.log('RECETA RECURSIVA: ', subrecetaId);
    const rctrcts = rctsrcts.filter((elem) => { // Obtener subrecetas
      return elem.idreceta === subrecetaId;
    });
    if ((typeof(rctrcts) === 'undefined' || rctrcts.length <= 0)) {
      rctsings.forEach((rcting) => { // Buscar ingrediente relacionado con la receta principal
        if (rcting.idreceta === subrecetaId) {
          const res = temporadas.every( reg => {
            return !(rcting.idingrediente === reg.idingrediente && mesesnom.includes(reg.temp));
          });
          if (res) {
            suma = suma + 1; // Sin disponibilidad
            console.log('SIN DISPONIBILIDAD!!!...');
            console.log('suma: ', suma);
          }
        }
      });
    } else {
      rctrcts.forEach(rctrct => {
        if (rctrct.idreceta === subrecetaId) {
          rctsings.forEach((rcting) => { // Buscar ingrediente relacionado con la receta principal
            if (rcting.idreceta === subrecetaId) {
              const res = temporadas.every( reg => {
                return !(rcting.idingrediente === reg.idingrediente && mesesnom.includes(reg.temp));
              });
              if (res) {
                suma = suma + 1; // Sin disponibilidad
                console.log('SIN DISPONIBILIDAD!!!...');
                console.log('suma: ', suma);
              }
            }
          });
          suma = suma + this.sinDisponibilidad(0, rctrct.idsubreceta, rctsrcts, rctsings, temporadas, mesesnom);
        }
      });
    }
    return suma; // Resultado parcial

  }

  // Función que filtra las recetas por temporada
  transform(arreglo: any[], texto: string, rctsrcts: any[], rctsings: any[], temporadas: any[], meses: any[],
            propiedad1: string, propiedad2: string): any[] {
    if ((typeof(arreglo) === 'undefined' || arreglo.length <= 0)) {
      console.log('Filtro Recetas: No hay arreglo');
      return;
    }
    const res = meses.some(elem => { // Ayuda a confirmar si algún mes fue seleccionado
      return elem.selected === true;
    });
    if ((texto === '') && (!res
    || (typeof(temporadas) === 'undefined' || temporadas.length <= 0)
    || (typeof(rctsings) === 'undefined' || rctsings.length <= 0))) {
      console.log('Filtro Recetas: Sin texto, y sin meses ni temporadas');
      return;
    }
    if ((texto !== '') && (!res
    || (typeof(temporadas) === 'undefined' || temporadas.length <= 0)
    || (typeof(rctsings) === 'undefined' || rctsings.length <= 0))) {
      console.log('Filtro Recetas: Con texto, y sin meses ni temporadas');
      return;
    }
    const meses2 = meses.filter(elem => { // Obtener arreglo de sólo los meses seleccionados
      return elem.selected === true;
    });
    const mesesnom = meses2.map(elem => elem.nombre); // Obtener arreglo de sólo los nombres de los meses seleccionados
    if ((texto === '') && !(!res
    || (typeof(temporadas) === 'undefined' || temporadas.length <= 0)
    || (typeof(rctsings) === 'undefined' || rctsings.length <= 0))) {
      console.log('Filtro Recetas: Sin texto, y con meses y temporadas');
      texto = texto.toLowerCase();
      return arreglo.filter( rct => { // Filtrar array de recetas
            const rctrcts = rctsrcts.filter((elem) => { // Obtener subrecetas
              return elem.idreceta === rct.id;
            });
            if ((typeof(rctrcts) === 'undefined' || rctrcts.length <= 0)) {
              return rctsings.every((rcting) => { // Buscar ingrediente relacionado con la receta principal
                if (rcting.idreceta === rct.id) {
                  return temporadas.some( reg => {
                    return rcting.idingrediente === reg.idingrediente && mesesnom.includes(reg.temp);
                  });
                }
                return true;
              });
            } else {
              return rctrcts.every(rctrct => {
                if (rctrct.idreceta === rct.id) {
                  return rctsings.every((rcting) => { // Buscar ingrediente relacionado con la receta principal
                    if (rcting.idreceta === rct.id) {
                      return temporadas.some( reg => {
                        return rcting.idingrediente === reg.idingrediente && mesesnom.includes(reg.temp);
                      });
                    }
                    return true;
                  }) && this.sinDisponibilidad(0, rctrct.idsubreceta, rctsrcts, rctsings, temporadas, mesesnom) === 0;
                }
                return true;
              });
            }
      }).sort((a, b) => (a[propiedad1] > b[propiedad1]) ? 1 :
      (a[propiedad1] === b[propiedad1]) ? ((a[propiedad2] > b[propiedad2]) ? 1 : -1) : -1 );
    }
    if ((texto !== '') && !(!res
    || (typeof(temporadas) === 'undefined' || temporadas.length <= 0)
    || (typeof(rctsings) === 'undefined' || rctsings.length <= 0))) {
      console.log('Filtro Recetas: Con texto, y con meses y temporadas');
      texto = texto.toLowerCase();
      return arreglo.filter( rct => {
        const rctrcts = rctsrcts.filter((elem) => { // Obtener subrecetas
          return elem.idreceta === rct.id;
        });
        if ((typeof(rctrcts) === 'undefined' || rctrcts.length <= 0)) {
          return rct[propiedad1].toLowerCase().includes(texto) &&
          rctsings.every((rcting) => { // Buscar ingrediente relacionado con la receta principal
            if (rcting.idreceta === rct.id) {
              return temporadas.some( reg => {
                return rcting.idingrediente === reg.idingrediente && mesesnom.includes(reg.temp);
              });
            }
            return true;
          });
        } else {
          return rct[propiedad1].toLowerCase().includes(texto) &&
          rctrcts.every(rctrct => {
            if (rctrct.idreceta === rct.id) {
              return rctsings.every((rcting) => { // Buscar ingrediente relacionado con la receta principal
                if (rcting.idreceta === rct.id) {
                  return temporadas.some( reg => {
                    return rcting.idingrediente === reg.idingrediente && mesesnom.includes(reg.temp);
                  });
                }
                return true;
              }) && this.sinDisponibilidad(0, rctrct.idsubreceta, rctsrcts, rctsings, temporadas, mesesnom) === 0;
            }
            return true;
          });
        }
      }).sort((a, b) => (a[propiedad1] > b[propiedad1]) ? 1 :
      (a[propiedad1] === b[propiedad1]) ? ((a[propiedad2] > b[propiedad2]) ? 1 : -1) : -1 );
    }

  }




}
