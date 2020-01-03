import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { MaterialExterno } from './materialexterno.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  AUTH_SERVER_ADDRESS =  'http://localhost:3000';

  constructor(private  httpClient: HttpClient) { }
// OBTENER ITEMS
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

  // Función que retorna todas las receta_materialexterno de 1 receta del usuario
  getIngredientesTemporadas(userId: number): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/temporadas/${String(userId)}`);
  }

  // Función que envía un request para registrar un material externo para un usuario, en el servidor
  crearMaterialExterno(me: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/api/materialexterno/crear`, me).pipe(
      tap(async (res: any ) => {

        if (res.data) {
          console.log(res.data);
        }
      })
    );
  }

  // Función que envía un request para registrar un usuario, en el servidor
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
