import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements DoCheck {
  usuario!: String | any;
  isLogged!: boolean;

  @ViewChild('navbarToggler', {static: false}) navbarToggler!:ElementRef;
  constructor(private loginService: LoginService,private router: Router) { }

  ngDoCheck(){
    this.isLogged = this.loginService.isLoggedIn();;
    
    if(this.isLogged){
      this.usuario = localStorage.getItem('usuario')
      this.usuario = this.usuario.substr(0, this.usuario.indexOf('@')); 
    }
  }

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }


}
