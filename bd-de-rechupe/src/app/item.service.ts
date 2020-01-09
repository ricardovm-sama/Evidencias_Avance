import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { MaterialExterno } from './materialexterno.model';
import { Ingrediente } from './ingrediente.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  AUTH_SERVER_ADDRESS =  'http://localhost:3000';

  constructor(private  httpClient: HttpClient) { }
// --------------------------------------------------------------------------------------------------------------------------------
// MÉTODOS PARA OBTENER ÍTEMS
// --------------------------------------------------------------------------------------------------------------------------------
  // Función que retorna todos los materiales externos del usuario
  getAllMaterialesExternos(userId: number): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/materialesexternos/` + userId);
  }

  // Función que retorna 1 material externo del usuario correspondiente
  getMaterialExterno(materialexternoId: number): Observable<any> {
     return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/materialexterno/` + materialexternoId);
  }

  // Función que retorna todos los ingredientes del usuario
  getAllIngredientes(userId: number): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/ingredientes/` + userId);
  }

  // Función que retorna 1 ingrediente del usuario correspondiente
  getIngrediente(ingredienteId: number): Observable<any> {
     return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/ingrediente/` + ingredienteId);
  }

  // Función que retorna todas las recetas del usuario
  getAllRecetas(userId: number): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/recetas/` + userId);
  }

  // Función que retorna 1 receta del usuario correspondiente
  getReceta(recetaId: number): Observable<any> {
     return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/receta/` + recetaId);
  }

  // Función que retorna todas las receta_receta del usuario
  getRecetasRecetas(userId: number): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/recetas_recetas/${String(userId)}`);
  }

  // Función que retorna todas las receta_receta de 1 receta del usuario
  getRecetaRecetas(userId: number, recetaId: number): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/receta_recetas/${String(userId)}/${String(recetaId)}`);
  }

  // Función que retorna todas las receta_ingrediente del usuario
  getRecetasIngredientes(userId: number): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/recetas_ingredientes/${String(userId)}`);
  }

  // Función que retorna todas las receta_ingrediente de 1 receta del usuario
  getRecetaIngredientes(userId: number, recetaId: number): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/receta_ingredientes/${String(userId)}/${String(recetaId)}`);
  }

  // Función que retorna todas las receta_materialexterno del usuario
  getRecetasMaterialesExternos(userId: number): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/recetas_materialesexternos/${String(userId)}`);
  }

  // Función que retorna todas las receta_materialexterno de 1 receta del usuario
  getRecetaMaterialesExternos(userId: number, recetaId: number): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/receta_materialesexternos/${String(userId)}/${String(recetaId)}`);
  }

  // Función que retorna todas las temporadas de todos los ingredientes del usuario
  getIngredientesTemporadas(userId: number): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/temporadas/${String(userId)}`);
  }

  // Función que retorna todas las temporadas de 1 ingrediente
  getIngredienteTemporadas(ingId: number): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/temporadas/ingrediente/${String(ingId)}`);
  }

// --------------------------------------------------------------------------------------------------------------------------------
// MÉTODOS PARA CREAR ÍTEMS
// --------------------------------------------------------------------------------------------------------------------------------
  // Función que envía un request para crear un ingrediente, en el servidor
  crearIngrediente(ing: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/api/ingrediente/crear`, ing).pipe(
      tap(async (res: any ) => {
        if (res.data) {
          console.log('ID de Ingrediente creado: ', res.data);
        }
      })
    );
  }

    // Función que envía un request para crear un ingrediente, en el servidor
  insertarTemporadasIngrediente(obj: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/api/temporadas/crear`, obj).pipe(
      tap(async (res: any ) => {
        if (res.data) {
          console.log('Temporadas insertadas: ', res.data);
        }
      })
    );
  }

  // Función que envía un request para crear un material externo, en el servidor
  crearMaterialExterno(me: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/api/materialexterno/crear`, me).pipe(
      tap(async (res: any ) => {
        if (res.data) {
          console.log(res.data);
        }
      })
    );
  }

// --------------------------------------------------------------------------------------------------------------------------------
// MÉTODOS PARA MODIFICAR ÍTEMS
// --------------------------------------------------------------------------------------------------------------------------------
  // Función que envía un request para modificar un ingrediente, en el servidor
  modicarIngrediente(ING: Ingrediente, form): Observable<any> {
      if (form.nombre !== '') { // Asignar los valores que se quieren cambiar
        ING.nombre = form.nombre;
      }
      if (form.precio !== '') {
        ING.precio = Number(form.precio);
      }
      if (form.peso !== '') {
        ING.peso = Number(form.peso);
      }
      if (form.peso_disp !== '') {
        ING.peso_disp = Number(form.peso_disp);
      }
      if (form.energia !== '') {
        ING.energia = Number(form.energia);
      }
      if (form.proteina !== '') {
        ING.proteina = Number(form.proteina);
      }
      if (form.grasa !== '') {
        ING.grasa = Number(form.grasa);
      }
      if (form.carbohidratos !== '') {
        ING.carbohidratos = Number(form.carbohidratos);
      }
      if (form.fibra !== '') {
        ING.fibra = Number(form.fibra);
      }
      if (form.colesterol !== '') {
        ING.colesterol = Number(form.colesterol);
      }
      if (form.sodio !== '') {
        ING.sodio = Number(form.sodio);
      }
      console.log('L2_NOMBRE: ' + ING.nombre);
      console.log('L2_PRECIO: ' + ING.precio);
      console.log('L2_PESO: ' + ING.peso);
      console.log('L2_PESO_DISP: ' + ING.peso_disp);
      console.log('L2_ENERGIA: ' + ING.energia);
      console.log('L2_PROTEINA: ' + ING.proteina);
      console.log('L2_GRASA: ' + ING.grasa);
      console.log('L2_CARBOHIDRATOS: ' + ING.carbohidratos);
      console.log('L2_FIBRA: ' + ING.fibra);
      console.log('L2_COLESTEROL: ' + ING.colesterol);
      console.log('L2_SODIO: ' + ING.sodio);

      return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/ingrediente/mod/`, ING).pipe(
        tap(async (res: any ) => {
          if (res.data) {
             console.log('Objeto recibido: ', res.data);
          }
        })
      );
  }

  // Función que envía un request para modificar un material externo, en el servidor
  modicarMaterialExterno(ME: MaterialExterno, nombre: string, marca: string,
                         precio: string, unidadesdisp: string, unidades: string): Observable<any> {
      if (nombre !== '') { // Asignar los valores que se quieren cambiar
        ME.nombre = nombre;
      }
      if (marca !== '') {
        ME.marca = marca;
     }
      if (precio !== '') {
        ME.precio = Number(precio);
     }
      if (unidadesdisp !== '') {
        ME.unidades_disp = Number(unidadesdisp);
     }
      if (unidades !== '') {
        ME.unidades = Number(unidades);
     }
      console.log('L2_NOMBRE: ' + ME.nombre);
      console.log('L2_MARCA: ' + ME.marca);
      console.log('L2_PRECIO: ' + ME.precio);
      console.log('L2_PESO: ' + ME.unidades_disp);
      console.log('L2_UNIDADES: ' + ME.unidades);

      return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/materialexterno/mod/${String(ME.id)}/${String(ME.nombre)}/
      ${String(ME.precio)}/${String(ME.unidades_disp)}/${String(ME.unidades)}/${String(ME.marca)}`);

            /*return this.httpClient.put<void>(`${this.AUTH_SERVER_ADDRESS}/api/materialexterno/mod/${ME.id}`, ME, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });*/
  }

// --------------------------------------------------------------------------------------------------------------------------------
// MÉTODOS PARA ELIMINAR ÍTEMS
// --------------------------------------------------------------------------------------------------------------------------------
  // Función que envía un request para eliminar un ingrediente, en el servidor
  eliminarIngrediente(ingId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER_ADDRESS}/api/ingrediente/elim/${String(ingId)}`);
  }

  // Función que envía un request para eliminar las temporadas de un ingrediente, en el servidor
  eliminarTemporadasIngrediente(ingId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER_ADDRESS}/api/temporadas/elim/${String(ingId)}`);
  }

    // Función que envía un request para eliminar un material externo, en el servidor
  eliminarMaterialExterno(mteId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER_ADDRESS}/api/materialexterno/elim/${String(mteId)}`);
  }

// --------------------------------------------------------------------------------------------------------------------------------
// MÉTODO PARA AGREGAR/DESECHAR CANTIDADES DE ÍTEMS
// --------------------------------------------------------------------------------------------------------------------------------
  // Función que permite agregar o desechar los items de la funcionalidad realizar. Actualiza ingredientes y/o materiales externos
  realizarAgregarDesechar(resp: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/api/realizar/`, resp).pipe(
      tap(async (res: any ) => {

        if (res.data.array) {
           console.log('Array recibido: ', res.data.array);
        }
      })
    );
  }

}
