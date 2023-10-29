import { BasicResponse } from "./BasicResponse";


export interface Role {
  id: number;
  nombre: string;
}

export interface RoleResponse extends BasicResponse {
  data: Role[];
}