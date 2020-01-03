import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Usuario } from './usuario.model';
import { AuthResponse } from './authresponse.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS  =  'http://localhost:3000';
  authSubject: BehaviorSubject<boolean>  =  new  BehaviorSubject(false);
  private userId: number;

  constructor(private  httpClient: HttpClient,
              private  storage: Storage) { }

  getUserId() {
    return this.userId;
  }

  setUserId(obtenido: number) {
    this.userId = obtenido;
  }

  // Función que permite obtener el valor de una llave del storage
  async getKeyValue(key: string): Promise<any> {
    try {
      const result = await this.storage.get(key);
      if (result != null) {
      return result;
      }
      return null;
      } catch (reason) {
      console.log(reason);
      return null;
      }
  }

  // Función que envía un request para registrar un usuario, en el servidor
  registrarUsuario(user: Usuario): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/user/`, user).pipe(
      tap(async (res: AuthResponse ) => {

        if (res.user) {
          this.userId = res.user.id;
          await this.storage.set('ACCESS_TOKEN', res.user.access_token);
          await this.storage.set('EXPIRES_IN', res.user.expires_in);
          await this.storage.set('userId', res.user.id);
          this.authSubject.next(true);
        }
      })
    );
  }

  // Función que envía un request para autentificar un usuario, en el servidor
  iniciarSesion(user: Usuario): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/user/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.user) {
          this.userId = res.user.id;
          await this.storage.set('ACCESS_TOKEN', res.user.access_token);
          await this.storage.set('EXPIRES_IN', res.user.expires_in);
          await this.storage.set('userId', res.user.id);
          this.authSubject.next(true);
        }
      })
    );
  }

  // Función que cierra la sesión de usuario. Remueve la información de autentificación del guardado local
  async cerrarSesion() {
    this.userId = null;
    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('EXPIRES_IN');
    await this.storage.remove('userId');
    this.authSubject.next(false);
  }

  // Función que obtiene el estado de autentificación de usuario. Comprueba si el usuario está en sesión o si finalizó su sesión.
  isLoggedIn() {
    // return this.authSubject.asObservable();
    return this.authSubject.value;
  }

}
