import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/modelo/producto';
import { Usuario } from 'src/app/modelo/usuario';
import { UsuarioDo } from 'src/app/modelo/UsuarioDo';
import { CrearProductoService } from 'src/app/servicios/crear-producto.service';
import { LoginService } from 'src/app/servicios/login.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto | any;
  isLogged: boolean;
  usuario: Usuario|any;
  usuarioDo:UsuarioDo|any;
  boton:boolean;
  constructor(private loginService: LoginService,private productoService: CrearProductoService,private servicioUsuario:UsuarioService) { }

  ngOnInit(): void {
    this.isLogged = this.loginService.isLoggedIn();
    this.productoService.getProductos().subscribe(
      res =>{
        this.productos=res;
        this.servicioUsuario.getUsuarioEmail(localStorage.getItem('usuario')).subscribe(
          res => {
               this.usuario=res;
               this.servicioUsuario.getUsuario(this.usuario.id).subscribe(
                res => {
                       this.usuarioDo=res;
                       console.log(this.usuarioDo);
                       if(this.usuarioDo.tipo=="COMPRADOR"){
                            this.boton=true;
                       }else{
                         this.boton=false;
                       }
                },
                err => {
               console.log(err);
                }
               );
            },
            err => {
            console.log(err);
            }
        );
      }
    );
   // this.tipos=[new Producto("https://th.bing.com/th/id/R.d7444dea8d32047c54be4d6390885208?rik=7Z3BrU1kuh5thg&pid=ImgRaw&r=0",500,"este es superman"),new Producto("https://th.bing.com/th/id/R.3b5ee7c6e592fe612250fa361d254893?rik=tcyfe5LTltRxOA&pid=ImgRaw&r=0",500,"este es batman"),new Producto("https://th.bing.com/th/id/R.d7444dea8d32047c54be4d6390885208?rik=7Z3BrU1kuh5thg&pid=ImgRaw&r=0",500,"este es superman"),new Producto("https://th.bing.com/th/id/R.3b5ee7c6e592fe612250fa361d254893?rik=tcyfe5LTltRxOA&pid=ImgRaw&r=0",500,"este es batman")];
  }

}
