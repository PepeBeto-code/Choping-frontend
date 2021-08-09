import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  API_URI = 'http://localhost:8080/api/autenticacion/registro';
  status = false
  constructor(private http: HttpClient) { }

  registrar(datos_formulario: Usuario){
    return this.http.post(this.API_URI, datos_formulario);
  }

  getTiposUsuario() {
    return this.http.get(this.API_URI + '/tipos_usuario');
  }
}
