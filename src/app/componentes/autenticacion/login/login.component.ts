import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/usuario';
import { first } from 'rxjs/operators';
import { LoginService } from 'src/app/servicios/login.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email=''
  password=''
  submitted = false;
  usuario: Usuario | any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private usuarioServicio: UsuarioService) { }

  ngOnInit(): void {
    // Validar longitud de contraseña de al menos 8 caracteres y que email corresponda a una sintaxis válida
    this.loginForm = this.formBuilder.group(
      {
        'email' : [null, [Validators.required, Validators.email]],
        'password': [null, [Validators.required, Validators.minLength(8)]]
      }
    );
  }

  getUsuario(nombre: String){
    this.usuario=null;
    this.usuarioServicio.getUsuarioNombre(nombre).subscribe(
      res=>{
        this.usuario=res
        swal.fire({
          title: 'Bienvenido.',
          text: "Sesión Iniciada",
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      err => {
        swal.fire({
          title: 'El usuario no existe.',
          text: "El nombre del usuario no existe",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        console.log(err);
        }
    )
  }
  camposInvalidos(){
    const campos_invalidos = []
    const controles = this.loginForm.controls
    for (const nombre_control in controles){
      if(controles[nombre_control].invalid){
        campos_invalidos.push(nombre_control)
      }
    }
    return campos_invalidos
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.loginForm.value);


    // Manejar el caso de que la forma sea invalida. En este caso que los campos esten vacios
    if(this.loginForm.invalid){
      let campos_invalidos = this.camposInvalidos()
      if (campos_invalidos.includes("email")){
        swal.fire(
          {
            title: 'El correo es invalido.',
            text: "Error",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }
        )
      }
      else if (campos_invalidos.includes("password")){
        swal.fire(
          {
            title: 'La contraseña debe ser al menos de 8 caracteres.',
            text: "Error",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }
        )
      }
      else {
        swal.fire(
          {
            title: 'Todos los campos son obligatorios',
            text: "Error",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }
        )
      }

      return
    }else{
      this.loginService.autenticar(this.loginForm.value).pipe(first())
      .subscribe(res => {
        swal.fire({
          title: 'Bienvenido.',
          text: "Sesión Iniciada",
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.loginService.loggedIn(this.loginForm.controls['email'].value, res);
        console.log(this.loginForm.controls['email'].value);
        this.submitted = false;
        this.router.navigate(['']);
        },
        err => {
        swal.fire({
          title: 'Credenciades Invalidas.',
          text: "Por favor verifica las credenciales",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        console.log(err);
        }
      );
  }
  }

  get f() { return this.loginForm.controls;}


}
