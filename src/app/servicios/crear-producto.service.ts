import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../modelo/producto';

@Injectable({
  providedIn: 'root'
})
export class CrearProductoService {
  API_URI = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  createProducto(producto: Producto) {
    return this.http.post(this.API_URI+'/productos', producto);
  }

  getProductosUsuario(id:number){
    return this.http.get(this.API_URI+'/productos/porUsuario/'+id);
  }

  getProductos(){
    return this.http.get(this.API_URI+'/productos');
  }
}
