import { HttpClient } from '@angular/common/http';
import { Injectable, computed } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Role, RoleResponse } from '../models/Rol.model';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private URL = environment.BACKEND_URL + "/roles"

  constructor(
    private http: HttpClient
  ) {
    this.getRoles()
  }

  public getRoles(): Observable<Role[]> {
    return this.http.get<RoleResponse>(this.URL)
      .pipe(
        map(res => res.data),
        catchError(err => of([]))
      )
  }


}
