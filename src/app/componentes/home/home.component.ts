import { Component, DoCheck, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelo/usuario';
import { LoginService } from 'src/app/servicios/login.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements DoCheck {
  isLogged: boolean;
  usuario:Usuario|any;
  constructor(private loginService: LoginService,private servicioUsuario:UsuarioService) { }

  ngDoCheck(): void {
    this.isLogged=false;
    this.actualizacion();
  }

  actualizacion(){
    this.usuario=null;
    this.isLogged = this.loginService.isLoggedIn();
    this.servicioUsuario.getUsuarioEmail(localStorage.getItem('usuario')).subscribe(
      res => {
           this.usuario=res;
        },
        err => {
        console.log(err);
        }
    );
  }

}
