import { TipoUsuario } from "./tipoUsuario";

export class Usuario{
  id: number;
  nombre: String;
  password: String;
  email:String;
  telefono:String;
  tipo_usuario: TipoUsuario;

  constructor(nombre:String, password: string,email:String,telefono:String,tipo_usuario:TipoUsuario) {
    this.nombre = nombre;
    this.password = password;
    this.email= email;
    this.telefono= telefono;
    this.tipo_usuario= tipo_usuario;
    
  }
}