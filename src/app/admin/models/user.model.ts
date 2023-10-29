import { BasicResponse } from "src/app/shared/models/BasicResponse";

export interface UsersListResponse {
  type: string;
  message: any[];
  data: User[];
}

export interface User {
  id: number;
  nombre: string;
  apellidos: string;
  dni: string;
  correo: string;
  activo: boolean;
  roles: Role[];
  roles_id: number[];
}

export enum Role {
  Administrador = "ADMINISTRADOR",
  Cliente = "CLIENTE",
}


export type UserRegister = Omit<User, 'id' | 'activo' | 'roles'> & {
  contrasena: string;
};

export type UserUpdateData = Pick<User, 'correo' | 'activo' | 'roles_id'>;


export interface UserRegisterResponse extends BasicResponse {
  data: User;
  token: string;
}

export interface UserResponse extends BasicResponse {
  data: User;
  token: string
}
