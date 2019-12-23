import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { MaterialExterno } from './materialexterno.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialexternoService {
  AUTH_SERVER_ADDRESS: string  =  'http://localhost:3000';

  constructor(private  httpClient: HttpClient) { }

  // Función que retorna todos los materiales externos del usuario
  getAllMaterialesExternos(userId: number): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/materialesexternos/` + userId);
  }

  // Función que retorna 1 material externo del usuario correspondiente
  getMaterialExterno(materialexternoId: number): Observable<any> {
     return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/materialexterno/` + materialexternoId);
  }

  // Función que envía un request para registrar un usuario, en el servidor
  modicarMaterialExterno(ME: MaterialExterno, nombre: string, marca: string,
                         precio: string, peso: string, unidades: string): Observable<any> {
      if (nombre !== '') { // Asignar los valores que se quieren cambiar
        ME.nombre = nombre;
      }
      if (marca !== '') {
        ME.marca = marca;
     }
      if (precio !== '') {
        ME.precio = Number(precio);
     }
      if (peso !== '') {
        ME.peso = Number(peso);
     }
      if (unidades !== '') {
        ME.unidades = Number(unidades);
     }
      console.log('L2_NOMBRE: ' + ME.nombre);
      console.log('L2_MARCA: ' + ME.marca);
      console.log('L2_PRECIO: ' + ME.precio);
      console.log('L2_PESO: ' + ME.peso);
      console.log('L2_UNIDADES: ' + ME.unidades);
      /*return this.httpClient.put<void>(`${this.AUTH_SERVER_ADDRESS}/api/materialexterno/mod/${ME.id}`, ME, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });*/
      return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/materialexterno/mod/${String(ME.id)}/${String(ME.nombre)}/
      ${String(ME.precio)}/${String(ME.peso)}/${String(ME.unidades)}/${String(ME.marca)}`);
  }

}
