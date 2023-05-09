import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioUsuariosService } from 'src/app/servicio-usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mail = "";
  password = "";
  nombreUsuario = "";
  ingresado = false;

  constructor(private usuarioServ:ServicioUsuariosService, private router: Router) {}
  
  ngOnInit(): void {

    if(history.state.mail != null){
      this.nombreUsuario = history.state.nombreUsuario;
      this.mail = history.state.mail;
      this.ingreso();
    }
  }

  ingreso(){
    let routerAux = this.router; 
    this.ingresado = true;
    setTimeout(function () {
      routerAux.navigateByUrl("");
    }, 1500);
  }

  ingresarUsuario(){

    this.usuarioServ.usuarios.forEach(usuario => {

      if(this.mail == usuario.mail && this.password == usuario.password){

        this.nombreUsuario = usuario.nombreUsuario;
        this.ingreso();
      }
    });
  }
}
