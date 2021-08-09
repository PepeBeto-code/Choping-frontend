import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/autenticacion/login/login.component';
import { RegistroComponent } from './componentes/autenticacion/registro/registro.component';
import { CrearProductoComponent } from './componentes/crear-producto/crear-producto.component';
import { HomeComponent } from './componentes/home/home.component';
import { InfoComponent } from './componentes/info/info.component';
import { ProductosComponent } from './componentes/productos/productos.component';

const routes: Routes = [
  {path: '' , component: HomeComponent },
  {path: 'login' , component: LoginComponent },
  {path: 'registro' , component: RegistroComponent },
  {path: 'productos' , component: ProductosComponent },
  {path: 'info' , component: InfoComponent },
  {path: 'crearProducto' , component: CrearProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
