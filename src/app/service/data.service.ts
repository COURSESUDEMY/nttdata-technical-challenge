import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ResponseUser, User } from '../core/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getUser(): Observable<User[]> {
    return this.http.get<ResponseUser>(`${this.apiUrl}/user`).pipe(
      map((respuesta) => this.maperData(respuesta)),
      catchError((error) => this._Error(error))
    );
  }

  maperData(respuesta: ResponseUser): User[] {
    const { user } = respuesta;

    return user.map((item: User) => ({
      name: item.name,
      email: item.email,
      status: item.status,
      statusName: item.status ? 'Habilitado' : 'Deshabilitado',
    })) as User[];
  }

  _Error(error: any): Observable<never> {
    let { status, message } = error;
    switch (status) {
      case 0:
        message = 'Error en el Servidor';
        break;
      case 500:
        message = 'Error en el Servidor';
        break;
      case 400:
        message = 'Error en el Servidor';
        break;
      case 4001:
        message = 'Token no es válido';
        break;
      case 404:
        message = 'Error en el Servidor';
        break;
    }
    return throwError(() => new Error(message));
  }
}
