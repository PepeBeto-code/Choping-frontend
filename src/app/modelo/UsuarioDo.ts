export class UsuarioDo{
    id: number;
    nombre: String;
    password: String;
    email:String;
    telefono:String;
    tipo: String;
  
    constructor(nombre:String, password: string,email:String,telefono:String,tipo:String) {
      this.nombre = nombre;
      this.password = password;
      this.email= email;
      this.telefono= telefono;
      this.tipo= tipo;
      
    }
  }