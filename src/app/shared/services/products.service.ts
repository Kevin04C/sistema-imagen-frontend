import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Product, ProductsResponse } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public API = environment.BACKEND_URL

  constructor(
    private http: HttpClient
  ) { }

  public getProducts(): Observable<Product[]> {
    const URL = `${this.API}/products`
    return this.http.get<ProductsResponse>(URL)
      .pipe(
        map(res => res.data)
      )
  }



}
