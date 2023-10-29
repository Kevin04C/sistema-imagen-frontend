import { BasicResponse } from "./BasicResponse";

export interface ProductsResponse extends BasicResponse {
  data: Product[];
}

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  stock: string;
  categoria: string;
  activo: boolean;
}
