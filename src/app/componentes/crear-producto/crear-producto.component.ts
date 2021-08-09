import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Producto } from 'src/app/modelo/producto';
import { Usuario } from 'src/app/modelo/usuario';
import { UsuarioDo } from 'src/app/modelo/UsuarioDo';
import { CrearProductoService } from 'src/app/servicios/crear-producto.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

import swal from 'sweetalert2';



@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm!: FormGroup;
  submitted: boolean;
  usuarioDo: UsuarioDo | any;
  usuario: Usuario | any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,private productoService: CrearProductoService,private servicioUsuario:UsuarioService) { }

  ngOnInit(): void {
    this.submitted=false;
    console.log(localStorage.getItem('usuario'));
    this.servicioUsuario.getUsuarioEmail(localStorage.getItem('usuario')).subscribe(
      res => {
           this.usuario=res;
           console.log(this.usuario);
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
    this.productoForm = this.formBuilder.group(
      {
        'precio' : [null, [Validators.required]],
        'descripcion': [null, [Validators.required]],
        'foto' : [null, [Validators.required]],
      }
    );
  }

  camposInvalidos(){
    const campos_invalidos = []
    const controles = this.productoForm.controls
    for (const nombre_control in controles){
      if(controles[nombre_control].invalid){
        campos_invalidos.push(nombre_control)
      }
    }
    return campos_invalidos
  }

  convertFileImg(event: any){
    var pdftobase64 = function(file: File,form: FormGroup){
      swal.fire({
        title: 'Espera un momento!',
        html: 'La imagen se está cargando',// add html attribute if you want or remove
        allowOutsideClick: false,
        preConfirm: () => {
            swal.showLoading()
        },
      });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        form.controls['foto'].setValue(reader.result);
        swal.close();
      };
      reader.onerror = function (error){
        console.log('Error: ',error);
      };
    }
    pdftobase64(<File> event.target.files[0],this.productoForm);
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.productoForm.value);


    // Manejar el caso de que la forma sea invalida. En este caso que los campos esten vacios
    if(this.productoForm.invalid){
      let campos_invalidos = this.camposInvalidos()
      if (campos_invalidos.includes("precio")){
        swal.fire(
          {
            title: 'El precio es obligatorio.',
            text: "Error",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }
        )
      }
      else if (campos_invalidos.includes("descripcion")){
        swal.fire(
          {
            title: 'La descripcion es obligatoria.',
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
      let producto=new Producto(this.productoForm.controls['foto'].value,
      this.productoForm.controls['precio'].value,
      this.productoForm.controls['descripcion'].value,this.usuario);
      console.log(producto);
      this.productoService.createProducto(producto).pipe(first())
      .subscribe(res => {
        swal.fire({
          title: 'Producto Creado.',
          text: "Producto Creado Exitosamente",
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.submitted = false;
        this.router.navigate(['info']);
        },
        err => {
        swal.fire({
          title: 'Algo Salio Mal.',
          text: "Por favor intentelo mas tarde",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        console.log(err);
        }
      );
  }
  }

  get f() { return this.productoForm.controls;}


}
