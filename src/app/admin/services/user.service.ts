import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { User, UserRegister, UserRegisterResponse, UserResponse, UserUpdateData, UsersListResponse } from '../models/user.model';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { registerUserErrorsMapper } from '../mapper/registerUserErrors.mapper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API = environment.BACKEND_URL;

  constructor(
    private http: HttpClient
  ) { }

  public getUsers() {
    const URL = `${this.API}/users`;

    return this.http.get<UsersListResponse>(URL)
      .pipe(
        map(resp => resp.data),
        catchError(() => throwError(() => 'Error al obtener los usuarios'))
      )
  }

  public registerUser(user: UserRegister) {
    const URL = `${this.API}/auth/register`;
    return this.http.post<UserRegisterResponse>(URL, user)
      .pipe(
        catchError((err) => throwError(() => registerUserErrorsMapper(err.error.messages[0])),
        ))
  }

  public getUserById(id: number): Observable<User | undefined> {
    const URL = `${this.API}/users/${id}`;
    return this.http.get<UserResponse>(URL)
      .pipe(
        map(resp => resp.data),
        catchError(() => of(undefined))
      )
  }

  public updateUser(id: number, data: UserUpdateData): Observable<User> {
    const URL = `${this.API}/users/${id}`;
    return this.http.put<UserResponse>(URL, data)
      .pipe(
        map(resp => resp.data),
        catchError(() => throwError(() => 'Hubo un error al actualizar el usuario'))
      )
  }

  public updatePasswordUser(id: number, password: string): Observable<boolean> {
    const URL = this.API + `/users/update-password/${id}`;
    return this.http.put<UserResponse>(URL, { contrasena: password })
      .pipe(
        map(res => !!res.data),
        catchError(() => throwError(() => 'Hubo un error al actualizar la contraseña'))
      )
  }

}



