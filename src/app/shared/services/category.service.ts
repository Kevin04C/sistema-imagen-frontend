import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CategoriesResponse, Category } from '../models/Category';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API = environment.BACKEND_URL

  constructor(
    private http: HttpClient
  ) { }


  public getCategories(): Observable<Category[]> {
    const URL = `${this.API}/categories`;

    return this.http.get<CategoriesResponse>(URL)
      .pipe(
        map(res => res.data)
      )
  }

}
