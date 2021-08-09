import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TipoUsuario } from 'src/app/modelo/tipoUsuario';
import { Usuario } from 'src/app/modelo/usuario';
import { RegistroService } from 'src/app/servicios/registro.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup
  tipos: TipoUsuario[] | any
  tipoUsuarioSelec: number;
  tipoUsuario: TipoUsuario | any;
  submitted: boolean;
  usuario: Usuario | any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private registroService: RegistroService,
    private usuarioService: UsuarioService,) { }

  ngOnInit(): void {
    this.submitted=false;
    // Validar longitud de contraseña de al menos 8 caracteres y que email corresponda a una sintaxis válida
    this.registroForm = this.formBuilder.group(
      {
        'nombre' : [null, [Validators.required]],
        'password': [null, [Validators.required, Validators.minLength(8)]],
        'email' : [null, [Validators.required, Validators.email]],
        'telefono': [null, [Validators.required, Validators.minLength(10)]],
        'tipo_usuario': [null, [Validators.required]],
      }
    );
    this.tipos=[new TipoUsuario(1,"Vendedor","Usuario que vende productos"),new TipoUsuario(2,"Comprador","Usuario que compra productos")];
   /* this.registroService.getTiposUsuario().subscribe(
      res => {
        this.tipos = res;
        console.log(this.tipos);
      },
      err => console.error(err)
    );*/
  }

  camposInvalidos(){
    const campos_invalidos = []
    const controles = this.registroForm.controls
    for (const nombre_control in controles){
      if(controles[nombre_control].invalid){
        campos_invalidos.push(nombre_control)
      }
    }
    return campos_invalidos
  }

  onSubmit(){
    this.submitted=true;
    if(this.registroForm.controls['nombre'].value==null ||
       this.registroForm.controls['email'].value==null||
       this.registroForm.controls['password'].value==null ||
       this.registroForm.controls['telefono'].value==null){
         return;
       }
    this.usuarioService.getUsuarioNombre(this.registroForm.controls['nombre'].value).subscribe(
      res => {
        swal.fire(
          {
            title: 'El nombre de usuario ya existe, por favor ingrese uno distinto',
            text: "Error",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }
        )
      },
      err => {
        this.usuarioService.getUsuarioEmail(this.registroForm.controls['email'].value).subscribe(
          res => {
            this.usuario=res;
            console.log(this.usuario);
            swal.fire(
              {
                title: 'Ya se ha regustrado una cuenta con este correo electronico, porvafor ingrese uno distinto',
                text: "Error",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              }
            )
          },
          err => {
            if(this.tipoUsuarioSelec==2){
              this.tipoUsuario= new TipoUsuario(2,"Comprador","usuario que compra productos");
              const rjson=JSON.stringify(this.tipoUsuario);
              const ojson=JSON.parse(rjson);
              this.registroForm.controls['tipo_usuario'].setValue(ojson);
              }else{
                if(this.tipoUsuarioSelec==1){
                  this.tipoUsuario= new TipoUsuario(1,"Vendedor","usuario que vende productos");
                  const rjson=JSON.stringify(this.tipoUsuario);
                  const ojson=JSON.parse(rjson);
                  this.registroForm.controls['tipo_usuario'].setValue(ojson);
                }
              }
            // Manejar el caso de que la forma sea invalida. En este caso que los campos esten vacios
            if(this.registroForm.invalid){
              this.tipoUsuarioSelec=0;
              this.registroForm.controls['tipo_usuario'].setValue(null);
              console.log(this.registroForm.value);
              let campos_invalidos = this.camposInvalidos()
              if (campos_invalidos.includes("telefono")){
                swal.fire(
                  {
                    title: 'El telefono debe tener 10 caracteres.',
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
              }else if (campos_invalidos.includes("email")){
                swal.fire(
                  {
                    title: 'El email es invalido',
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
                
              console.log(this.registroForm.value);
              let usuario = new Usuario(
                this.registroForm.controls['nombre'].value,
                this.registroForm.controls['password'].value,
                this.registroForm.controls['email'].value,
                this.registroForm.controls['telefono'].value,
                this.registroForm.controls['tipo_usuario'].value,
        
              );
                console.log(usuario);
              this.registroService.registrar(usuario).pipe(first())
                .subscribe(res => {
                    swal.fire({
                      title: 'Usuario creado exitosamente .',
                      text: "Ya puedes iniciar sesión",
                      icon: 'success',
                      confirmButtonText: 'Ok'
                    });
                    console.log(usuario);
                    this.submitted=false;
                    this.router.navigate(['login']);
        
                  },
                  err => {
                    swal.fire({
                      title: 'Algo ha salido mal.',
                      text: "Por favor intentalo nuevamente",
                      icon: 'error',
                      confirmButtonText: 'Ok'
                    });
                    console.log(err);
                  }
                );
            }
          }
        );
      }
    );
  }
  get f() { return this.registroForm.controls;}


}
