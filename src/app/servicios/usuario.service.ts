import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URI = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getUsuarioNombre(nombre: String){
    return this.http.get(this.API_URI+'/usuarios/porNombre/'+nombre)
}
getUsuarioEmail(email: String){
  console.log("Hooooooolaaaaaa");
  return this.http.get(this.API_URI+'/usuarios/porEmail/'+email)
}
getUsuarios() {
  return this.http.get(this.API_URI+'/usuarios')
}

getUsuario(id: number) {
  return this.http.get(this.API_URI+'/usuarios/'+id)
}

createUsuario(usuario: Usuario) {
  return this.http.post(this.API_URI+'/usuarios', usuario);
}

updateUsuario(usuario: Usuario) {
  return this.http.put(this.API_URI+'/usuarios/'+usuario.id, usuario);
}


deleteUsuario(id: number) {
  return this.http.delete(this.API_URI+'/usuarios/'+id);
}
}
