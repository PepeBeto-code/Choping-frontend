import { Usuario } from "./usuario";

export class Producto{
    id: number;
    foto: String;
    precio: number;
    descripcion: String;
    usuario: Usuario

    constructor(foto:String,precio:number,descripcion:String,usuario:Usuario){
        this.foto=foto;
        this.precio=precio;
        this.descripcion=descripcion;
        this.usuario=usuario;
    }
}