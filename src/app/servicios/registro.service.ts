import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  API_URI = 'http://localhost:8080';
  status = false
  constructor(private http: HttpClient) { }

  registrar(datos_formulario: any){
    return this.http.post<any>(this.API_URI + '/api/autenticacion/registro', datos_formulario);
  }
}
