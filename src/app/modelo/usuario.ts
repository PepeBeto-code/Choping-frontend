import { TipoUsuario } from "./tipoUsuario";

export interface Usuario{
  id: number;
  nombre: String;
  password: String;
  email:String;
  telefono:String;
  tipo: TipoUsuario;

}