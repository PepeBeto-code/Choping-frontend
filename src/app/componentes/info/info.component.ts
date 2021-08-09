import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/modelo/producto';
import { Usuario } from 'src/app/modelo/usuario';
import { UsuarioDo } from 'src/app/modelo/UsuarioDo';
import { CrearProductoService } from 'src/app/servicios/crear-producto.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  title:String;
  usuario: Usuario | any;
  boton:boolean;
  usuarioDo: UsuarioDo | any;
  productos: Producto[] | any;
  constructor(private router: Router,private servicioUsuario:UsuarioService,private productoService: CrearProductoService) { }

  ngOnInit(): void {
    this.servicioUsuario.getUsuarioEmail(localStorage.getItem('usuario')).subscribe(
      res => {
           this.usuario=res;
           this.servicioUsuario.getUsuario(this.usuario.id).subscribe(
            res => {
                   this.usuarioDo=res;
                   console.log(this.usuarioDo);
                   if(this.usuarioDo.tipo=="VENDEDOR"){
                        this.boton=true;
                        this.title="PRODUCTOS";
                      this.productoService.getProductosUsuario(this.usuarioDo.id).subscribe(
                        res => {
                              this.productos=res;
                              console.log(this.productos);
                        },
                        err => {
                          console.log(err);
                        }
                      );
                   }else{
                     this.boton=false;
                     this.title="COMPRAS";
                   }
            },
            err => {
              swal.fire({
                title: 'No autoriazado.',
                text: "Por favor inicia sesion",
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            }
           );
        },
        err => {
        swal.fire({
          title: 'No autoriazado.',
          text: "Por favor inicia sesion",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        console.log(err);
        }
    );
  }


}
